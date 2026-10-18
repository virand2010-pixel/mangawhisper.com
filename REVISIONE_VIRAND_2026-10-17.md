# Revisione Whisper — Virand, 17 ottobre 2026

## Base e perimetro

Sito completo `https://whisper-world-andrea.proud-guppy-7701.chatgpt.site/`, r11. Non il prototipo MailerLite. La revisione mantiene immagini originali, sezioni, caroselli, ingrandimenti, tab lore, social, letture esterne, selettore Blue/Dark/Light e newsletter esterna. Nessun modulo di registrazione o backend nuovo.

## Modifiche richieste

- Identità: Virand nei testi, nomi accessibili, footer, titolo e metadati social. La firma iniziale è **Of Virand**, come richiesta espressamente. Il dominio esistente viene conservato; i crediti di altri illustratori, come DEVA, non vengono riassegnati.
- Hero: `WELCOME TO THE WORLD OF WHISPER` diventa l'unico h1 e messaggio dominante. La frase preesistente esatta era `A world waiting to be heard.`: resta come sottotitolo narrativo. Artwork e dissolvenza originali mantenuti.
- Tipografia: Cinzel 700 per gli elementi fantasy, testo corrente in carattere leggibile. Font ospitato localmente, 46.124 byte, licenza OFL in `dist/assets/fonts/Cinzel-OFL.txt`; nessun collegamento Google Fonts durante la visita.
- Lettura: titolo richiesto `CONTINUA LA STORIA` con attributo `lang="it"`; il resto rimane in inglese. Rimosso l'avviso ridondante sotto i pulsanti. Lingue e destinazioni EN/IT/ES preservate; francese ancora non disponibile, senza finto collegamento.
- Rune: SVG decorativi con `aria-hidden`, senza immagini generate o librerie. Effetti CSS collegati alla pausa esistente, alle preferenze di movimento ridotto, alla visibilità della pagina e delle sezioni.
- Shop: prezzi standard **8,90 €**, entrambe le variant **9,90 €**. Valori in centesimi in `config.js`, aggiornamento coerente delle schede e del dialog dei dettagli, con fallback statico HTML.
- Promo: `INCREDIBLE PROMO CARDS`; immagini originali ingrandibili. Nessuna promessa di omaggio universale o bundle sempre disponibile.
- Figure: immagini originali più grandi e dicitura **COMING SOON** fuori dall'immagine. Le cifre già stampate negli artwork non diventano prezzi di vendita del sito.
- Francia: **ÉDITION FRANÇAISE**, **COMING SOON**, **XYMORE**, non ancora stampata secondo l'autore. Rimosso soltanto il vecchio collegamento commerciale ADH per non attribuirlo a XYMORE; nuova destinazione da confermare.
- Autore: predisposti ritratto e bio con segnaposto espliciti. Nessuna fotografia inventata o biografia attribuita senza fonte.
- Guild: conservati struttura, artwork in dissolvenza, blu e collegamento alla newsletter esistente. Registrazione tramite email sul nuovo sito rinviata come richiesto.

## Verifica commerciale e fonti

Consultate il 17 ottobre 2026:

- [Whisper standard — MangaSenpai](https://mangasenpai.it/product/41747790/whisper-1): 8,90 €.
- [Variant Edition 2 — MangaSenpai](https://mangasenpai.it/product/41820156/whisper-1-variant-edition-2): 9,90 €.
- [Variant Lucca — MangaSenpai](https://mangasenpai.it/product/41747800/whisper-1-variant-lucca): 9,90 €.
- Le tre schede indicano una cartolina per i primi 100 preordini. Non verificata la quota residua e non dedotta l'inclusione delle quattro promo mostrate in ogni volume. Copy prudente con rinvio alla promozione corrente dell'editore.
- [Pagina ADH esistente](https://adh-edition.com/whisper): non conferma il nuovo nome XYMORE. Non trovata una fonte primaria che consenta di correggere XYMORE in OXYMORE. Mantenuta provvisoriamente la grafia fornita direttamente dall'autore, in attesa del suo link ufficiale.
- [Virand su MANGA Plus Creators](https://mangaplus-creators.jp/authors/27270846): attribuzione della serie.
- [Cinzel — fonte ufficiale e licenza](https://github.com/google/fonts/tree/main/ofl/cinzel). Versione web del font scaricata dal CDN ufficiale Google e conservata nel progetto con OFL.

## Materiali e decisioni ancora necessari

1. Fotografia autorizzata di Virand e biografia definitiva.
2. Riferimento ufficiale XYMORE, collegamento e futura data di pubblicazione.
3. Conferma delle condizioni effettive dei bundle promo prima di usare `AVAILABLE IN BUNDLE WITH THE VOLUME` come promessa generale.
4. Registrazione email sul sito, privacy e relativo flusso: fase separata; il collegamento newsletter già esistente resta attivo.

I controlli del rilascio sono registrati in `QA.md`; versione, commit e distribuzione nel riepilogo esterno di progetto.
