# Whisper — verifica della versione autonoma

Data: 16 ottobre 2026. Le prove della versione iniziale sono state eseguite nel browser integrato basato su Chromium, su anteprima locale. Le verifiche browser della revisione r2 sono completate in anteprima locale; il rilascio viene verificato separatamente. Non equivale a certificazione WCAG né a test su iPhone fisico/Safari.

## Revisione r2 — 16-10-2026

Modifiche: hero più compatta e sfumatura dello sfondo; CTA mobile larga; galleria edizioni con contatore e frecce solo in presenza di overflow; lightbox di cinque artwork con precedente/successivo e ArrowLeft/ArrowRight; nomi d'azione accessibili nella lore e tavola Gebo intera; indicazione della sezione corrente e icona movimento coerente.

- **Passato:** controllo sintattico `node --check dist/app.js`.
- **Passato in Chromium locale:** larghezze effettive 320, 392, 843 e 1419 CSS px, senza overflow orizzontale. Orizzontale 843 × 391: testata non fissa e pagina scorrevole.
- CTA principale: fondo a circa 632 px su 392 × 844 e 636 px su 320 × 680, quindi visibile nella prima schermata alle misure provate.
- Galleria edizioni: controlli nascosti quando non serve scorrere; avanti e ArrowLeft aggiornano posizione e contatore; finestra variant, Escape e ritorno focus verificati.
- Artwork: avanti, ArrowLeft, titolo/contatore aggiornati e Escape con ritorno focus verificati. Tavola Gebo intera con object-fit contain.
- Lore: ArrowRight seleziona Hake; Gebo selezionabile. Indicazione della sezione corrente e nome accessibile esplicito del comando movimento verificati. Pausa/play aggiornano anche l'icona.
- Nessun errore o warning console catturato durante queste prove; nessuna immagine caricata rotta. Restano da provare Safari iOS fisico, screen reader e zoom del browser.
- Corretto durante l'audit il calcolo della sezione corrente: aggiornamento su scroll passivo con requestAnimationFrame, senza loop continuo e senza margini percentuali dell'IntersectionObserver.
- Screenshot r2 locale: [whisper-desktop-r2.jpg](review/whisper-desktop-r2.jpg).
- **Hosting:** `get_site` conferma accesso pubblico, modificato dall'utente, sullo stesso URL <https://whisper-world-andrea.proud-guppy-7701.chatgpt.site>. Conservare questo accesso e indirizzo; la verifica del rilascio r2 sul sito pubblico resta distinta dalle prove locali.

Le misure e lo screenshot riportati sotto documentano la versione iniziale; non vanno attribuiti alla r2 prima della sua verifica.

## Controlli completati sulla versione iniziale

- JavaScript: `node --check dist/app.js`, esito positivo dopo le correzioni.
- Layout: larghezze effettive del documento 320, 392, 843 e 1419 CSS pixel; nessun debordamento orizzontale. Altezza viewport rispettivamente 680, 844, 391 e 960 pixel. La verifica 843 × 391 copre il telefono in orizzontale: pagina scorrevole, testata non fissa per lasciare spazio.
- Prima schermata a 392 pixel: fondo CTA principale a circa 693 pixel, immagine e testo leggibili. A 320 pixel la CTA è raggiungibile con un breve scorrimento su viewport molto bassi.
- Menu mobile: apertura, scelta sezione e chiusura automatica; destinazione edizioni sotto la testata.
- Edizioni: scorrimento orizzontale funzionante e pulsanti disabilitati ai limiti; finestra dettagli, chiusura con Escape e ritorno del focus al pulsante di partenza.
- Lore: selezione Hake, freccia destra verso Gebo, pannello e focus sincronizzati.
- Illustrazioni: apertura e chiusura del dialog, ritorno del focus al comando che lo ha aperto.
- Movimento: pausa ripristinata dopo ricarica. Revisione codice di `prefers-reduced-motion`: prevale sulla preferenza salvata; comando disabilitato e testo “Motion reduced” quando richiesto dal dispositivo. Simulazione del sistema operativo non eseguita.
- Immagini: nessun asset caricato rotto; dimensioni HTML corrispondenti ai file. Otto WebP per 792.918 byte. Nessuna dipendenza esterna per font o JavaScript.
- Controlli senza nome accessibile: zero; immagini prive dell'attributo alt: zero. Decorazioni non informative escluse ove possibile.
- Nessuna chiamata API, iscrizione simulata o invio email. Link non configurati privi di href e non raggiungibili con Tab.

## Correzioni durante il controllo della versione iniziale

- Nome accessibile esplicito per l'ingrandimento hero quando l'etichetta visiva è nascosta su telefono.
- Comando movimento con area di almeno 44 × 44 pixel.
- Dimensioni intrinseche delle immagini allineate agli asset reali.
- Contrasto del focus su sfondo scuro e riepilogo footer con area tattile adeguata.
- Stato movimento ridotto coerente tra CSS, testo e pulsante.
- Newsletter inattiva indicata come “Sign-up opens soon”. Aggiornamento automatico dell'etichetta quando viene configurato il link.

## Prima del lancio commerciale

Collegare le destinazioni definitive e aggiornare contestualmente gli avvisi di anteprima; confermare varianti, bundle e diritti/attribuzioni con Andrea; fornire informativa e configurazione privacy effettive del servizio newsletter; provare Safari iOS e Android reali; verificare contrasto e screen reader con strumenti dedicati. Nessuna promessa di incremento vendite o conformità certificata.

Screenshot della prima schermata della versione iniziale: [whisper-desktop.jpg](review/whisper-desktop.jpg).

## Revisione r3 — materiali Drive

- Controllati file originali e inquadrature delle copertine mediante immagini di revisione. Corretto il ritaglio CSS con maschera prospettica per escludere il frammento rosso della locandina. Non si pubblicano prezzi o date come dati commerciali.
- Nuove immagini WebP presenti, dimensioni verificate; hero invariata. Raccolta completa 1.746.720 byte; le nuove immagini sono sotto la prima schermata e lazy-loaded.
- Controllo sintattico JavaScript e git diff --check superati. Controllo statico dei riferimenti locali e dei sei pulsanti artwork effettuato.
- **Limite:** al momento dell’integrazione Drive il browser controllabile non è disponibile (inventario vuoto). La r2 era stata verificata in Chromium; per r3 non viene dichiarata una nuova prova browser. Restano da verificare sul browser le nuove inquadrature e l’impaginazione del pulsante di anteprima. La pubblicazione viene attestata separatamente dalla risposta del servizio Sites.

## Correzione frecce mobile r4 — 16 ottobre 2026

- Sostituite tutte le 21 frecce Unicode: CTA, lingue, tre edizioni, tre zoom lore, footer, shop dialog, navigazione gallerie e indicazione swipe. SVG inline, senza librerie aggiuntive.
- Verifica statica: nessuna freccia Unicode residua; 21 SVG con aria-hidden, focusable false e viewBox corretto. Preservati i nomi accessibili dei comandi e le scorciatoie ArrowLeft/ArrowRight.
- La verifica su browser del sito pubblico segue la pubblicazione; non viene dichiarato un test su iPhone fisico.

## Revisione r5 — creature originali animate, 16 ottobre 2026

- Ispezionato il video dell’utente e identificato l’originale della pecora addormentata: Thurisaz, 4 frame, ciclo 2 secondi.
- Sei GIF originali acquisiti dal Drive autorizzato; ricodifica WebP lossless, riduzione intera, alpha e timeline verificati. Gebo aggrega pose identiche senza perdere durata.
- Browser Chromium locale: controllati ingresso, lettura, lore e Guild. Pecora sul bordo del fumetto, altri personaggi in spazi dedicati. Nessuna sovrapposizione osservata con testo o controlli.
- Area utile verificata a 320, 374/394, 500 e 1440 px; nessun overflow della pagina. Telefono orizzontale verificato a 824 × 400: pecora all’interno della hero, senza taglio superiore.
- Pausa: zero immagini animate dopo pressione; ripresa: animate solo le creature nel viewport. Entrando nella lore, pecora e creatura della lettura tornano statiche mentre il trio visibile si anima.
- `prefers-reduced-motion`, scheda nascosta e fallback senza IntersectionObserver verificati nel codice; nessuna emulazione del sistema operativo dichiarata. Nessun test su Safari/iPhone fisico.
- Sintassi JavaScript e `git diff --check` superati. Nessun errore console osservato. Restano invariati link in preparazione e raccolta email disattivata.

## Revisione r6 — autore, social e correzione pecora

- Pecora spostata in uno spazio riservato sotto le CTA della hero. Ispezione visiva Chromium a circa 374 px utili e desktop 1440 px; nessuna sovrapposizione osservata con illustrazione, testo o pulsanti.
- Nessun overflow orizzontale a 320 px utili. Verificato anche telefono orizzontale a 824 × 400 px: pagina scorrevole, fumetto sotto il logo/timbro senza collisione.
- Sezione autore verificata visivamente su mobile: titolo, descrizione e pulsante Instagram leggibili e contenuti nel viewport.
- Tre collegamenti social puntano al profilo fornito dall'utente, senza query, con apertura esterna dichiarata, target e rel corretti. Nessun login al profilo e nessuna verifica dei contenuti dell'account.
- Newsletter senza href quando non configurata; nessuna raccolta email o invio reale. Testo hero coerente con Patreon non ancora configurato.
- Canonical, metadati social, immagine JPEG, robots e sitemap predisposti; non è stata simulata una condivisione tramite un crawler social né verificata l'indicizzazione.
- Controllo sintattico di `dist/app.js` e `dist/config.js` e controllo differenze Git superati. Le prove su Safari/iPhone fisico, screen reader e prestazioni misurate rimangono da svolgere.

## Revisione r7 — destinazioni ufficiali e collezionabili

- Fonte iniziale: screenshot forniti dall'utente e pagina ufficiale `https://www.mangawhisper.com/join`, ispezionata nel browser. Individuati tre percorsi di lettura, tre schede MangaSenpai, modulo newsletter e materiali promozionali originali. Nessuna conversazione o screenshot WhatsApp viene pubblicato.
- Inglese e spagnolo: titoli di Virand su MANGA Plus Creators. Italiano: Whisper ITA su GlobalComix. Francese: nessuna lettura valida nella pagina sorgente; mantenuto indisponibile. Rimossi dal codice i riferimenti a Patreon.
- Tre schede editore valide e link ADH verificati. Non effettuati acquisti e non dedotta la disponibilità dal pulsante carrello. Figure come anteprime; condizioni degli omaggi non dedotte dalle locandine.
- Il collegamento Facebook fornito reindirizza a `facebook.com/Virandart`; usato il percorso pulito senza query. Nessun accesso all'account.
- Newsletter: modulo MailerLite presente nella sezione `HGGHHGGHGHGH`. Collegamento esterno diretto alla sezione; nessun modulo duplicato, nessuna copia della firma del form, nessuna email inserita o iscrizione effettuata. Consegna, consenso e doppio opt-in non verificati.
- Sette immagini originali convertite WebP a 960 px, complessivamente 770.592 byte; caricamento differito, spazio riservato e alternative testuali. Le locandine mantengono le proprie diciture originali; quelle delle figure sono presentate come riferimenti promozionali, non come offerte acquistabili.
- Chromium locale: layout a 320, 374 e 1419 px utili senza overflow orizzontale. Verificati visivamente lettura, promo, figure e Guild. Corretto durante il controllo il debordamento causato dal testo accessibile dei link nel carosello, assegnando un contenitore posizionato ai link.
- Ingrandimento promo Hake: immagine e titolo corretti; chiusura e ritorno del focus al pulsante originale. Dettagli Variant 01: destinazione MangaSenpai Edition 2 corretta, nessuna promessa di bonus automatica. Newsletter collegata, assenza di form locali. Nessuna immagine caricata rotta o errore console rilevato.
- Nessun test su Safari/iPhone fisico o invio newsletter: questi limiti rimangono espliciti.

## Revisione r8 — palette vivace

- Nuovo stylesheet cromatico caricato dopo quello base; nessuna nuova immagine, dipendenza o modifica JavaScript. Collegamenti ai capitoli e configurazione esterna invariati per richiesta esplicita dell'utente.
- Contrasto calcolato per le combinazioni principali: inchiostro/turchese 9,33:1; inchiostro/giallo 12,87:1; inchiostro/corallo 6,39:1; bianco/blu 8,48:1. Corretto il focus nella sezione autore. Questi controlli non costituiscono una certificazione completa di accessibilità.
- Browser Chromium locale: assenza di overflow della pagina a 320, 374, 824 e 1419 px utili; altezza 400 px nella prova orizzontale. Ispezionate visivamente hero desktop e mobile, edizioni mobile e Guild desktop. Testo della Guild separato dalla parte più luminosa dell'illustrazione.
- Nessun errore console rilevato. Nessuna immagine caricata rotta: l'unico elemento senza dimensione naturale è l'immagine del dialog chiuso, senza src fino all'apertura.
- Le catture sono riuscite con il browser visibile e ritaglio esplicito; una cattura orizzontale non è riuscita. Per questa revisione il controllo orizzontale è geometrico, senza dichiarare una nuova ispezione visiva completa. Nessun test su Safari/iPhone fisico.
- `git diff --check` superato. Pubblicazione e screenshot del risultato vengono registrati nel riepilogo di progetto fuori dal repository.

## Revisione r9 — blu notte e originale della hero, 17 ottobre 2026

- Rimossa dal caricamento la palette vivid r8. Tema night dopo il CSS base: sfondi blu coerenti, testo chiaro, oro caldo, immagini con colori naturali. Corretti stati hover, focus, dialoghi e colore ereditato nella Guild.
- Ripristinata la sorgente esatta della hero dal JPEG originale 1540 × 1068, 363.430 byte, senza ricompressione. Derivata mobile WebP 900 × 624, 247.702 byte. Preload e srcset corrispondenti; nessun upscaling dei file. L'originale disponibile della stessa scena non supera 1540 px.
- Chromium locale: controlli geometrici a 320, 374, 824 × 400 e 1419 px utili, senza overflow della pagina. Ispezione visiva home desktop/mobile e shop mobile. Le sezioni mantengono la stessa famiglia cromatica.
- Ingrandimento hero: file originale corretto, titolo e testo del dialog leggibili, chiusura con Escape e ritorno del focus al pulsante di apertura. Menu mobile aperto e chiuso correttamente.
- Contrasti calcolati: testo principale su pannello 12,98:1; testo secondario 8,38:1; testi oro dei prodotti 6,91:1; testo scuro su pulsante oro 11,03:1. Nessuna certificazione complessiva di accessibilità dedotta da questi controlli.
- Nessuna immagine caricata rotta o errore console rilevato. Collegamenti ai capitoli, shop e newsletter preservati. Nessuna modifica JavaScript o nuova libreria. `git diff --check` superato.
- Nessuna prova su iPhone/Safari fisico; la verifica orizzontale r9 è geometrica. Esito pubblicazione e screenshot annotati nel riepilogo esterno del progetto.

## Revisione r10 — equilibrio blu, giallo e carta chiara

- Riferimento: video del prototipo MailerLite fornito dall'utente. Nuova composizione iniziale senza riquadro ruotato, blu comune a hero/lore/Guild, giallo per azioni principali e fondi chiari per scelta della lingua e shop. Nessuna nuova dipendenza, modifica JavaScript o sostituzione dell'artwork iniziale.
- Chromium locale: assenza di overflow a 320, 374, 747, 824 × 400 e 1419 px utili. Ispezionate home desktop/mobile/tablet, scelta della lingua mobile e shop nella misura intermedia. Il controllo orizzontale è geometrico. Corretto il gradiente della hero per separare il testo dalla parte luminosa dell'immagine, soprattutto a 561–800 px.
- Contrasti calcolati: inchiostro/carta 14,40:1; testo secondario/carta 6,01:1; bianco/blu 9,77:1; giallo/blu 7,17:1; inchiostro/giallo 11,14:1. Migliorato anche il testo French indisponibile a 4,88:1. Valori riferiti a colori uniformi, senza dedurre una certificazione complessiva.
- Corretto il passaggio del mouse sul tab lore selezionato: conserva fondo giallo e testo blu. Focus delle immagini entro le schede arrotondate visibile anche con overflow nascosto.
- CTA principale raggiunge #read con la sezione sotto l'intestazione. Carosello passa a «Edition 2 of 3». Tab Hake attivo e pannello corretto; ingrandimento Hake apre titolo/immagine, Escape chiude e restituisce il focus al comando originale. Nessun errore console o immagine caricata rotta rilevato nell'ultima verifica completata della r9; nella r10 le sorgenti immagini restano le stesse.
- La cattura aggiuntiva di World/Guild mobile non è riuscita; ereditarietà dei colori verificata nel codice. Non dichiarati test su Safari/iPhone fisico. `git diff --check` superato; rilascio e screenshot nel riepilogo esterno.
# Tre palette sulla composizione completa r10 — 17 ottobre 2026

- Confronto con il commit di partenza `210acf8a33dd47ea123b39f7c9e005b65c0200fd`: header, main, footer e dialoghi HTML identici; CSS base, CSS Blue, configurazione dei link, app.js e asset invariati.
- Overlay cromatico validato con allowlist: soltanto variabili colore, colore testo/sfondo/bordi/focus/scrollbar, color-scheme e gradienti con gli stessi punti di transizione. Nessuna proprietà di geometria, dimensione, tipografia o animazione.
- Chromium desktop, 1686 px utili: geometria di tutte le sezioni, sorgenti immagini, href e scroll identici passando Blue → Dark → Light. Nessun overflow della pagina.
- Chromium mobile, 374 px utili: carosello passato a Edition 2 of 3; cambi Light → Dark → Blue conservano posizione carosello, scroll e geometria di tutte le sezioni. Controllo Theme alto 44 px. Escape chiude il pannello e riporta il focus al comando.
- Controllo sintassi JavaScript e `git diff --check` superati. Contrasti puntuali dell'overlay: Dark testo principale 12,98:1; testo secondario 8,38:1; CTA oro 11,03:1. Light CTA oro 10,70:1; testo secondario su giallo 4,65:1; bianco sui pulsanti petrolio 4,96:1. Non è una certificazione complessiva di accessibilità né una prova su Safari/iPhone fisico.

## Revisione Virand / portale fantasy — 17 ottobre 2026

- Base r11: conservati tutti gli asset originali e tutti i collegamenti funzionali, salvo il vecchio shop ADH non pertinente al nuovo riferimento XYMORE. Nessuna registrazione o raccolta e-mail aggiunta.
- Controlli statici: un solo h1, ID univoci, nessun vecchio nome autore nei testi pubblici, prezzi coerenti con la configurazione; sintassi app.js e git diff --check superati.
- Chromium a 320, 374, 405, 824 × 400 (orizzontale) e 1313 px utili: nessun overflow orizzontale della pagina o testo visibile tagliato rilevato geometricamente. Nessuna immagine caricata rotta o errore console rilevato.
- Mobile: descrizioni principali 16 px, lingue 17 px, provider 13 px; pulsanti lingua alti 88 px, CTA principale 54–58 px, prezzi prodotto 28 px. Corretto a 27 px il prezzo nel dialogo, prima sovrascritto dalla regola mobile sui paragrafi.
- Ispezione visiva della hero desktop/mobile, scelta lingua mobile e porzione visibile dello shop. Alcune catture dello strumento risultavano ritagliate o disallineate: le verifiche geometriche DOM non equivalgono a una verifica visiva integrale di ogni sezione. Nessuna prova su Safari/iPhone fisico.
- Dialogo Standard: titolo, prezzo 8,90 € e link shop corretti. Ingrandimento promo Hake funzionante; Escape chiude e ripristina il focus. Nessun acquisto o iscrizione effettuato.
- Blue, Dark e Light restano selezionabili. La pausa ferma tutte le 16 rune e il bagliore della CTA; presenti arresto fuori schermo e con scheda nascosta. Regole prefers-reduced-motion verificate nel codice, senza modificare le impostazioni del dispositivo.
- Contrasti calcolati sui principali abbinamenti uniformi: minimo 5,80:1; CTA 11,31:1; hero Blue 9,30:1; testo shop 12,39:1. Non costituisce certificazione WCAG complessiva.
- Cinzel 700 locale da 46.124 byte con licenza OFL inclusa; nessuna nuova libreria, canvas o tracciamento. Rune SVG decorative escluse dall'albero accessibile.


## Hero animata — r13, 17 ottobre 2026

- Chromium: a 1706 px, preferenza iniziale in pausa → nessun src video assegnato. Avvio tramite comando esistente → readyState 4, muted true, riproduzione del derivato desktop; pausa → paused true.
- Schermo mobile 520 e 373 px: derivato mobile selezionato, riproduzione verificata a 520 px e nessun overflow orizzontale a entrambe le larghezze. Ispezione visiva dell'inquadratura e delle dissolvenze mobile; nessun cambiamento strutturale degli altri elementi.
- Scorrendo alla lettura, illustrazione completamente fuori vista → video paused true. Source di ingrandimento originale invariata. Fallback originale mantenuto dietro al video e visibilità attivata solo all'evento playing.
- Revisione indipendente e harness Node VM sul ciclo play asincrono: corretto il caso Pause → Play prima della risoluzione iniziale; AbortError ora ritenta soltanto se ancora eleggibile. NotAllowedError non provoca loop di tentativi. Movimento ridotto/Data Saver controllati nel codice, senza cambiare le impostazioni del dispositivo.
- Sintassi JS, git diff --check e derivati video verificati. Nessuna prova su Safari/iPhone fisico; il risparmio energetico del browser può impedire l'autoplay, lasciando l'immagine originale.


## Loop senza salto e qualità nativa — r14

- Sorgente 1136 × 800, 24 fps, non ciclico: differenza media ultimo→primo fotogramma 68,10/255 al campione 284 × 200. I tagli interni non producevano un raccordo coerente.
- Output MP4 H.264 CRF21, 1136 × 800, 432 fotogrammi, 18 secondi, 23.139.137 byte. Sequenza avanti/indietro con rallentamento coseno; primo e ultimo frame derivano dalla stessa immagine. Nessuna riduzione della risoluzione sui telefoni.
- Verifica indipendente del video decodificato: differenza al raccordo 1,085/255 sul campione, ridotta del 98,4%; residuo di compressione, nessun salto geometrico. Nove campioni nativi confrontati con il sorgente: PSNR 33,16–39,54 dB, MAE 2,00–3,99/255. Questi sono controlli numerici, non una promessa di codifica senza perdita.
- Test VP9 scartato: solo 9,5% di risparmio con fedeltà peggiore in 8 campioni su 9. Distribuito esclusivamente il MP4 di maggiore qualità. Vecchi derivati a bassa risoluzione rimossi.
- I controlli di pausa, visibilità e movimento ridotto restano quelli già verificati nella r13; nessuna modifica alle altre sezioni o al CSS. Fonte originale dell'ingrandimento conservata.

- Chromium locale: MP4 finale riprodotto con readyState 4, dimensioni decodificate 1136 × 800 e durata 18 secondi; inquadratura mobile ispezionata. Non eseguito un test su iPhone fisico.


## Avvio nitido — r15

Revisione indipendente: nessun vero filtro blur nella hero; la dissolvenza video di 650 ms e lo zoom CSS della precedente immagine creavano il falso defocus. Eliminati entrambi, mantenendo i gradienti statici. Primo frame del loop estratto in WebP lossless nativo (1.325.534 byte) per img, preload e poster video. Vecchio srcset rimosso dalla hero; originale di ingrandimento conservato.

Chromium locale: immagine animationName=none e transform=none; transizione video=0s; poster e img hanno lo stesso URL, preload coerente. Nessuna ricodifica o modifica del loop r14. Controllo git diff --check superato.


## Movimento lineare — r16

- Revisione indipendente dello script e dei fotogrammi decodificati: progressione cronologica 12→24→36…→135; nessuna inversione, velocità costante. Raccordo finale di 12 frame, confine equivalente a 11→12.
- FFprobe: 1136 × 800, 24 fps, 135 fotogrammi, 5,625 secondi; MP4 9.527.222 byte. Ispezionato il provino del raccordo: la breve sovrapposizione è un compromesso esplicito per il master non ciclico.
- Nuovo poster lossless estratto dal primo fotogramma; stessa risorsa per preload, immagine e poster. CSS e JS invariati: niente dissolvenza/zoom all'avvio, controlli motion r15 conservati.
- git diff --check superato. Anteprima locale non verificata in browser per timeout di connessione; verifica della versione pubblica registrata separatamente nel riepilogo di rilascio.
