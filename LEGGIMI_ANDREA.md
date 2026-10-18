# WHISPER — consegna a Virand / Andrea

Ultima versione: r16, 17 ottobre 2026.
Sito online: https://whisper-world-andrea.proud-guppy-7701.chatgpt.site/

## Aprire il sito
1. Estrai tutto lo ZIP.
2. Apri dist/index.html nel browser per una consultazione rapida.
3. Per l'anteprima completa consigliata: con Python installato, apri il terminale nella cartella del progetto ed esegui:
   python -m http.server 4180 --bind 127.0.0.1 --directory dist
   Poi visita http://127.0.0.1:4180/ dal medesimo computer.

Non servono compilazione, npm, account o chiavi API.
Per vederlo immediatamente anche dal telefono usa il link online sopra.

## Modifiche
- dist/index.html: contenuti e struttura.
- dist/config.js: link lettura/shop/newsletter e prezzi.
- dist/styles.css e gli altri CSS: grafica, responsive e temi.
- dist/app.js: interazioni principali.
- dist/hero-video.js: caricamento e pausa del video.
- dist/assets/: tutte le immagini, font e video utilizzati.
- scripts/build-hero-loop.py: ricetta per rigenerare il video con FFmpeg e NumPy.
- source-assets/upland-original.mp4: master originale fornito.

La versione r16 ha video nativo 1136x800, sempre in avanti a 24 fps; durata 5,625 s e breve raccordo finale di 0,5 s. Il master non e' ciclico: il raccordo puo' essere percepibile. Avvio senza zoom o dissolvenza.
Temi Blue, Dark e Light; pausa animazioni; prezzi Standard 8,90 EUR, Variant 9,90 EUR. Crediti pubblici Virand.
Foto e biografia definitive, privacy e contatto ufficiale, disponibilita' francese/figure e condizioni delle promo restano da completare o confermare. Nessuna registrazione interna implementata.

## Pubblicare su un altro hosting
Carica il contenuto di dist nella radice del tuo hosting statico, conservando i percorsi delle sottocartelle.
Se cambi dominio, aggiorna i riferimenti assoluti in index.html, sitemap.xml e robots.txt.

README.md e QA.md contengono anche lo storico delle revisioni: per lo stato attuale considera r16 e questo file.
Questa copia portabile non comprende credenziali, cronologia Git o configurazione dell'hosting Codex.
