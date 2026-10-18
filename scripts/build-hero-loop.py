"""Build a forward-only loop with a 12-frame cyclic dissolve at native resolution.

Usage: python scripts/build-hero-loop.py SOURCE.mp4 OUTPUT.mp4
Requires ffmpeg/ffprobe on PATH and numpy. No reversing or generated artwork.
The source is not cyclic: the short dissolve remains a visible compromise.
"""
import json
from pathlib import Path
import subprocess
import sys
import numpy as np

source, destination = map(Path, sys.argv[1:3])
info = json.loads(subprocess.check_output([
    'ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries',
    'stream=width,height,r_frame_rate', '-of', 'json', str(source)
]))['streams'][0]
width, height = info['width'], info['height']
assert info['r_frame_rate'] == '24/1', 'This recipe expects the supplied 24fps master'
decoded = subprocess.check_output([
    'ffmpeg', '-v', 'error', '-i', str(source), '-map', '0:v:0',
    '-f', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1'
])
frames = np.frombuffer(decoded, dtype=np.uint8).reshape(-1, height, width, 3)
count, overlap, fps = len(frames), 12, 24
assert count > 2 * overlap
destination.parent.mkdir(parents=True, exist_ok=True)
encoder = subprocess.Popen([
    'ffmpeg', '-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24',
    '-s', f'{width}x{height}', '-r', str(fps), '-i', 'pipe:0', '-an',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '21', '-movflags', '+faststart',
    '-pix_fmt', 'yuv420p', '-g', '48', str(destination)
], stdin=subprocess.PIPE)
try:
    # Chronological middle, followed by chronological tail/head layers.
    for frame in frames[overlap:count-overlap]:
        encoder.stdin.write(frame.tobytes())
    for j in range(overlap):
        alpha = j / (overlap - 1)
        alpha = alpha * alpha * (3 - 2 * alpha)
        mixed = np.rint(frames[count-overlap+j].astype(np.float32) * (1-alpha)
                        + frames[j].astype(np.float32) * alpha).astype(np.uint8)
        encoder.stdin.write(mixed.tobytes())
finally:
    encoder.stdin.close()
if encoder.wait() != 0:
    raise RuntimeError('Video encoding failed')
print(json.dumps({'mode':'forward-only', 'source_frames': count,
    'output_frames':count-overlap, 'width':width, 'height':height,
    'seconds':(count-overlap)/fps, 'fps':fps, 'dissolve_frames':overlap,
    'dissolve_seconds':overlap/fps, 'seam_source_frames':[overlap-1,overlap],
    'bytes':destination.stat().st_size}))
