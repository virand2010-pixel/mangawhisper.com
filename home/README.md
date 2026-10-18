# Whisper — sito autonomo

Versione aggiornata il **17 ottobre 2026** per il progetto manga di Andrea Virnicchi. Questa versione supera il formato a blocchi MailerLite: è un sito statico autonomo in HTML, CSS e JavaScript, senza framework o dipendenze esterne.

- Sorgente da distribuire: `dist/`.
- Progetto Sites: `appgprj_6ad239a0d8748191a373faf30d9e1b6d`.
- URL pubblico: <https://whisper-world-andrea.proud-guppy-7701.chatgpt.site>.
- Accesso pubblico confermato da `get_site` nella revisione del 16 ottobre 2026, dopo il cambio effettuato dall'utente. Conservare URL e accesso pubblico nei successivi aggiornamenti; il rilascio delle nuove rifiniture va verificato separatamente.

## Stato corrente — revisione r10

L'utente supera sia la r8 molto satura sia la r9 tutta scura, fornendo un video del proprio prototipo MailerLite. Direzione corrente: **blu dell'avventura, giallo per le azioni principali e superfici chiare per leggere e scegliere**. Il nuovo `dist/theme-adventure.css`, dopo il CSS base, usa la stessa famiglia di blu nell'ingresso, nella lore e nella Guild; lettura e shop hanno fondi crema/perla, schede bianche e testi blu. I precedenti temi vivid e night non vengono caricati.

L'ingresso è ricomposto: headline libera sul blu, senza il grande riquadro ruotato; illustrazione sfumata nel fondo, azione di lettura gialla, percorso shop secondario e spazio riservato alla pecora. Le superfici di lettura/shop sono più leggere, con bordi e ombre contenuti. Contrasto, hover, focus e impaginazione mobile sono verificati separatamente. Non vengono importati dal video numeri promozionali o risultati commerciali non verificati.

L'immagine iniziale usa ora la **stessa scena dal JPEG originale 1540 × 1068**, copiato senza ricompressione, anziché la precedente derivata WebP 1200 × 832. Variante mobile WebP 900 × 624 a qualità 93; `srcset`, `sizes` e preload coerenti. L'ingrandimento apre il JPEG originale. Non è stato trovato un originale più grande della medesima scena: il file Drive `whisper chkk.jpg` da 3496 × 2480 è un'illustrazione diversa e non è stato sostituito alla cover.

Decisione aggiornata: **mantenere gli attuali riferimenti ai capitoli**. L'ipotesi di un lettore interno è rinviata; non implementare letture gratuite o a pagamento senza una nuova decisione.

La decisione aggiornata di Andrea supera il brief iniziale: **Patreon non fa parte del progetto**. Il sito collega ora le letture reali in inglese e spagnolo su MANGA Plus Creators e in italiano su GlobalComix. Il francese rimane indisponibile per la lettura online; l’edizione fisica francese ha un collegamento distinto ad ADH Éditions.

Sono configurati i tre shop MangaSenpai, la newsletter esterna già esistente e i profili Instagram e Facebook. La sezione collezione presenta quattro promo, due anteprime di figure e la cover francese. Prezzi, stock, omaggi e condizioni delle locandine non costituiscono un’offerta garantita da questo sito.

Restano da fornire contatto ufficiale e informativa privacy reale; da verificare il capitolo preciso per chi arriva dal QR e le condizioni commerciali definitive. La newsletter è collegata, ma il suo invio, la conferma dell’iscrizione e l’eventuale doppio opt-in non sono stati provati. Esiti dei controlli tecnici in [QA.md](QA.md); questa sintesi non attesta da sola la pubblicazione della revisione.

## Revisione r2 — 16-10-2026 (storico)

Rifinitura della versione esistente, conservando gli artwork originali, la palette solare e l'estetica manga:

- Hero più compatta, con sfumatura tra illustrazione e sfondo; CTA principale a tutta larghezza su mobile.
- Galleria delle edizioni con contatore, indicatore di posizione e frecce visibili solo quando serve scorrere; navigazione anche con frecce da tastiera.
- Lightbox con sei artwork, controlli precedente/successivo, contatore e tasti freccia sinistra/destra.
- Nomi accessibili che esplicitano l'ingrandimento delle immagini della lore; tavola Gebo mostrata interamente con `object-fit: contain`.
- Sezione corrente evidenziata nella navigazione, icona del movimento coerente con l'azione disponibile e collegamento dalla lettura in preparazione al mondo di Upland.

Il controllo sintattico `node --check dist/app.js` è passato. La nota originaria sulla verifica in corso è storica: gli esiti delle singole revisioni sono conservati in QA.md e non vanno trasferiti automaticamente a versioni successive. Stato e prove sono registrati in [QA.md](QA.md).

## Struttura e obiettivo

Il percorso principale porta chi arriva dal QR del volume alla continuazione del manga. Il percorso secondario presenta le edizioni fisiche. Seguono la scoperta di Upland, Hake e dei Whisper, la presentazione di Andrea e la Reader’s Guild. I testi dell’interfaccia sono in inglese; le letture inglese, italiana e spagnola sono collegate a piattaforme reali, mentre il francese è esplicitamente indisponibile.

`dist/index.html` contiene i contenuti e la struttura accessibile. `dist/styles.css` gestisce la composizione e le varianti responsive. `dist/app.js` gestisce menu, movimento, galleria, dialog e schede della lore. `dist/config.js` contiene esclusivamente i collegamenti pubblici configurabili.

Per un'anteprima locale servire la cartella `dist` con un server statico; per esempio, da quella cartella, `python -m http.server 4181 --bind 127.0.0.1`, quindi aprire `http://127.0.0.1:4181/`. Non servono installazioni di pacchetti o compilazioni. Per distribuire il sito, pubblicare il contenuto di `dist` mantenendo i percorsi relativi.

## Collegamenti configurati e manutenzione

`dist/config.js` contiene lo stato corrente dei link pubblici. Il precedente campo `patreon` è rimosso e sostituito da `reading`, con URL e nome della piattaforma per ogni lingua:

```js
window.WHISPER_CONFIG = {
  "reading": {
    "en": {
      "url": "https://mangaplus-creators.jp/titles/v82512040438090027270846",
      "label": "MANGA Plus Creators"
    },
    "it": {
      "url": "https://globalcomix.com/c/whisper-1",
      "label": "GlobalComix"
    },
    "es": {
      "url": "https://mangaplus-creators.jp/titles/7e2607300108500027270846",
      "label": "MANGA Plus Creators"
    },
    "fr": {
      "url": "",
      "label": ""
    }
  },
  "shop": {
    "standard": "https://mangasenpai.it/product/41747790/whisper-1",
    "variant1": "https://mangasenpai.it/product/41820156/whisper-1-variant-edition-2",
    "variant2": "https://mangasenpai.it/product/41747800/whisper-1-variant-lucca",
    "french": "https://adh-edition.com/whisper"
  },
  "newsletterUrl": "https://www.mangawhisper.com/join#HGGHHGGHGHGH",
  "privacyUrl": "",
  "social": {
    "instagram": "https://www.instagram.com/virand_art/",
    "facebook": "https://www.facebook.com/Virandart/"
  }
};
```

| Campo | Destinazione e verifica |
| --- | --- |
| `reading.en` | MANGA Plus Creators, *Whisper (ENG)* di Virand |
| `reading.it` | GlobalComix, *Whisper ITA* di Virand |
| `reading.es` | MANGA Plus Creators, *Whisper* di Virand, lingua ES |
| `reading.fr` | Vuoto: nessuna lettura francese disponibile; non sostituirlo con uno shop |
| `shop.standard` | MangaSenpai, *Whisper 1*, edizione regular |
| `shop.variant1` | MangaSenpai, *Whisper 1 Variant Edition 2*: la landing originale di Andrea associa questo URL alla grafica **Variant Cover 01** |
| `shop.variant2` | MangaSenpai, *Whisper 1 Variant Lucca* |
| `shop.french` | Pagina ufficiale ADH Éditions di Whisper; non attesta lo stato della campagna di preordine |
| `newsletterUrl` | Form MailerLite osservato sulla landing esistente di Andrea; nessun invio eseguito |
| `social.instagram` | Profilo fornito dall’utente, senza parametri di condivisione |
| `social.facebook` | Profilo `Virandart`, destinazione verificata del link Facebook di condivisione fornito |
| `privacyUrl` | Ancora vuoto: serve un’informativa reale, pertinente ai servizi effettivi |

Sono accettati URL assoluti HTTPS senza credenziali incorporate. I valori vuoti o non validi lasciano il collegamento indisponibile. Le destinazioni configurate si aprono in una nuova scheda con `noopener noreferrer`. Non inserire password, token o chiavi API in questo file: il codice è pubblico.

Per modificare un link, controllare che lingua, edizione e condizioni coincidano con il contenuto promesso. Aggiornare anche i link statici e gli avvisi editoriali di `index.html`, compreso “About this website”, affinché il percorso resti coerente anche senza JavaScript. La configurazione non verifica il checkout, lo stock o le condizioni di iscrizione.

**Dipendenza newsletter da conservare:** `https://www.mangawhisper.com/join#HGGHHGGHGHGH` porta ancora alla precedente landing. Non eliminare quella pagina, il suo servizio o il relativo modulo prima di aver migrato la destinazione, verificato il funzionamento e aggiornato `newsletterUrl` e i link statici. Non è stato copiato né incorporato il form in questo sito.

## Immagini e contenuti confermati

Il primo nucleo di immagini deriva dai dieci riferimenti JPEG forniti dall’utente nello ZIP `WhatsApp Unknown 2026-10-16 at 13.00.25.zip`. Gli originali restano nel progetto Whisper precedente. A questi si aggiungono i materiali Drive della r3, le animazioni della r5 e sette originali della landing di Andrea nella r7. Nessun artwork è stato rigenerato con IA. La tabella seguente documenta il nucleo iniziale; i precedenti abbinamenti provvisori delle variant sono superati dai materiali confermati nelle revisioni successive.

| Asset | Dimensioni effettive | Utilizzo |
| --- | --- | --- |
| `upland-hero.webp` | 1200 × 832 | Derivata storica, superata nella r9 |
| `upland-hero-original.jpg` | 1540 × 1068 | Originale dell'ingresso e visualizzazione ingrandita |
| `upland-hero-mobile.webp` | 900 × 624 | Variante responsive dell'ingresso |
| `upland-town.webp` | 1100 × 673 | Panorama di Upland |
| `prince-and-gebo.webp` | 620 × 620 | Hake con il compagno blu |
| `volume-one-wrap.webp` | 1000 × 524 | Copertina stesa; logo e fronte inquadrati via CSS |
| `variant-art-one.webp` | 760 × 536 | Artwork provvisorio della prima variant |
| `variant-art-two.webp` | 620 × 881 | Artwork provvisorio della seconda variant e Guild |
| `promo-card-preview.webp` | 900 × 506 | Anteprima della promo card |
| `gebo-panel.webp` | 700 × 933 | Tavola manga con le creature; non una copertina |

Il nucleo iniziale qui elencato pesa **1.746.720 byte**, circa **1,67 MiB**: è una misura storica, non il totale corrente del sito. Le immagini sotto la hero sono caricate in modo differito. Le condizioni definitive dei bundle restano da confermare; nessun prezzo o stock fittizio viene presentato come reale.

Il protagonista è **Hake**, nome confermato dall’utente. Upland e il principe muto seguono il brief. Nella r7 le creature sono presentate come **Whisper**, coerentemente con il sito esistente di Andrea; `gebo` resta in alcuni nomi tecnici di asset e identificatori. L’edizione francese rimanda alla pagina ufficiale ADH Éditions senza dichiarare date o disponibilità non verificate. Patreon è escluso dalla configurazione e dal percorso pubblico.

## Funzioni e dati

- Menu mobile e collegamenti interni alle sezioni.
- Movimento decorativo con controllo di pausa e supporto alla preferenza di movimento ridotto.
- Edizioni scorrevoli con contatore, controlli condizionati allo scorrimento e schede di approfondimento.
- Dialog per ingrandire e sfogliare gli artwork originali e i nuovi materiali della collezione, anche con i tasti freccia.
- Schede Upland/Hake/Whisper navigabili anche con frecce, Home ed End.
- Collegamenti esterni attivi per tre letture, tre edizioni italiane, pagina editore francese, newsletter e due social, gestiti dalla configurazione.

**Questo sito non raccoglie direttamente email e non incorpora moduli, analytics, tracker pubblicitari o social, account, pagamenti o ordini.** Lettura, acquisto e iscrizione avvengono sulle piattaforme esterne collegate, con i rispettivi servizi e condizioni. Il sito non contiene un backend. La preferenza sul movimento può essere salvata localmente nel browser con la chiave `whisper-motion-v1`; non viene trasmessa al server. I file del sito e delle immagini sono serviti dall'hosting, che può applicare i propri log tecnici.

L’iscrizione avviene sul form MailerLite osservato nella landing esterna indicata da `newsletterUrl`. Non sono stati inviati dati di prova: invio, messaggio di conferma, consegna email e doppio opt-in rimangono da verificare. Per incorporare in futuro il form serviranno configurazione approvata, informativa coerente e verifica distinta del trattamento dei dati. Contatto del responsabile e documenti legali/privacy reali sono ancora da fornire; il collegamento alla newsletter non ne attesta la conformità.

## Accessibilità e prestazioni: progetto e verifiche

Sono previsti skip link, struttura semantica, alternative testuali, focus visibile, controlli con nomi accessibili, dialog nativi, gestione del focus alla chiusura, tab della lore da tastiera e contenuti disponibili anche senza JavaScript. Il layout comprende telefono verticale e orizzontale, tablet e desktop. Le immagini fuori dall'ingresso usano il caricamento differito; la hero ha priorità di caricamento. Non si caricano librerie o font da servizi esterni.

Queste scelte **non equivalgono a una certificazione di conformità WCAG** o a un risultato misurato di performance. Le verifiche visive e funzionali per ciascuna revisione in Chromium sono documentate in QA.md. Non sono stati eseguiti test su Safari iOS fisico né audit formale con screen reader.

Riferimenti per la validazione continuativa (esiti disponibili e limiti in QA.md):

1. Layout a 320/390 px, tablet, desktop e telefono orizzontale; nessun overflow dell'intera pagina.
2. CTA di lettura, menu mobile, ancore con intestazione fissa e focus da tastiera.
3. Galleria, selezione delle edizioni, ingrandimento immagini, Escape e ripristino del focus.
4. Contrasto, leggibilità sopra gli artwork, zoom al 200% e nomi dei controlli con screen reader.
5. Preferenza di movimento ridotto e stato del pulsante coerenti con gli effetti effettivi.
6. Collegamenti configurati e assenza di false disponibilità quando i campi sono vuoti.
7. Prestazioni misurate sul sito distribuito e su una connessione mobile; immagini e percorsi senza errori.

Prima del lancio definitivo Andrea dovrà confermare i testi, le immagini delle edizioni, i link pubblici e l'informativa applicabile. La prova nel browser locale non sostituisce il controllo dell'URL pubblicato.

## Materiali Drive integrati — revisione r3 (storico)

Cartella condivisa dall’utente: https://drive.google.com/drive/folders/16_E_xMXxgnjxIIBHkcP0Iln4FqdtpX4h . L’autorizzazione all’uso nel progetto è stata fornita dall’utente nella conversazione; i diritti generali restano da validare con Andrea prima del lancio.

- Regular cover: `21.jpg`, ID `1JgPjdtWivHQIgqT1Wk-BNnUsGHJuHYQG`.
- Variant 1: `2.jpg`, ID `1zsmAh7KMJnsela2V5Aru4svhEBQNZ_2q`.
- Lucca variant: `shop omb.jpg`, ID `18vESsZ8bDVCIRMGjIDfnj29C_zYV9Wst`.
- Pagina inglese: `Whisper_eng01_003-min.jpg`, ID `1DBfnBAl9CBpTYVhzIRTJmOGFVFt1cvVw`.
- Hake: originale `hake.jpg`, ID e provenienza nel manifest della cartella materiali.

Le locandine restano integre negli asset ottimizzati; CSS inquadra soltanto il prodotto nelle schede e nel dialog, escludendo prezzi, date e inviti all’acquisto stampati. Non si ricostruiscono copertine via AI. La seconda variant prende il nome Lucca dalla grafica originale. Le assegnazioni provvisorie delle due precedenti illustrazioni alle variant sono superate dai nuovi materiali; i dettagli dei bundle e i link shop restano da confermare.

Una pagina reale in inglese è esplorabile dalla sezione lettura, anche prima dell’attivazione dei capitoli Patreon. La galleria artwork ha ora sei elementi. Hake usa la medesima illustrazione da un originale a maggiore risoluzione. I GIF e i video non sono caricati automaticamente. Il file `mimì.jpg` mostra il nome Kiria: non è stato usato per evitare una classificazione errata.

## Regola icone — correzione mobile r4

Nella r4 le 21 frecce allora presenti sono state convertite in SVG inline con classe `icon-arrow`, dimensioni esplicite e tratto currentColor. La stessa regola vale per le nuove frecce introdotte successivamente. Non usare caratteri Unicode, emoji, font di icone o frecce testuali in nuovi pulsanti/link: il rendering può cambiare tra sistemi, come già riscontrato sul sito DUO PULL. I nomi accessibili restano su testo e pulsanti; SVG decorativi `aria-hidden=true`, `focusable=false`. Mantenere le aree tattili e gli stati disabilitati esistenti.

## Creature originali animate — r5 (storico; posizione pecora aggiornata in r6)

Su richiesta dell’utente e confronto con il video fornito, integrate tutte e sei le animazioni originali della sottocartella Drive Personaggi, già censite nel progetto. La pecora addormentata è `ThurisazHD.gif`: compare sul bordo superiore del fumetto iniziale. `BluethootHD.gif` accompagna la lettura; Algiz, Gebo e Tiwaz introducono la lore; Jera accompagna la Guild. Questi nomi identificano i file sorgente e non introducono nuove affermazioni sulla lore pubblica.

Asset in `dist/assets/companions`: ogni personaggio ha una versione WebP animata e una statica. Conversione lossless, riduzione intera 2× con nearest-neighbor, trasparenza e durata conservate. Sei animazioni: 43.876 byte complessivi; statici: 17.598 byte. Originali GIF e inventario restano nella cartella materiali del progetto, fuori dal sito distribuito.

Il markup carica lo statico per default; senza JavaScript o IntersectionObserver rimane fermo. Gli animati si caricano soltanto quando entrano nel viewport, la pagina è visibile e il movimento è attivo. Pausa, preferenza di sistema `prefers-reduced-motion` e uscita dal viewport ripristinano lo statico: `animation-play-state` da solo non ferma le immagini animate. Spazio e dimensioni riservati prevengono salti di layout. Creature decorative con `alt=""`, `aria-hidden`, nessun focus o intercettazione dei tocchi. Nessuna libreria aggiunta, nessun nuovo tracker.

## Preparazione al lancio — r6 (storico; collegamenti aggiornati in r7)

La collocazione della pecora descritta nella r5 è superata: Thurisaz occupa ora uno spazio riservato in fondo al fumetto iniziale, sotto le CTA, accanto alla frase di chiusura. Dimensione 68 px su mobile e 78 px su desktop; non è più sovrapposta all'illustrazione o al bordo del fumetto. Rimangono animazione originale, pausa e caricamento condizionato.

Aggiunta una sezione dedicata ad Andrea Virnicchi, autore di Whisper, senza biografia o riconoscimenti inventati. Il profilo Instagram fornito dall'utente è `https://www.instagram.com/virand_art/`, senza parametro di tracciamento. È collegato dalla presentazione autore, dalla Guild e dal footer, con icona SVG, apertura in nuova scheda dichiarata e `noopener noreferrer`. Il campo `social.instagram` in `dist/config.js` ne centralizza la destinazione. Non sono presenti embed Instagram o tracker social; il contenuto del profilo non è stato verificato con un accesso all'account.

Finché Patreon non è configurato, la CTA iniziale dice “Explore the manga”; diventa “Continue the story” se almeno una destinazione Patreon HTTPS valida viene inserita. La seconda CTA dice “Explore the editions”. Gli avvisi editoriali vanno comunque aggiornati manualmente quando le destinazioni diventano operative. La Guild propone ora Instagram come azione disponibile; i vantaggi newsletter sono dichiarati come pianificati e l'iscrizione email rimane inattiva e separata. Non si raccolgono indirizzi email.

Predisposti titolo con nome autore, canonical, metadati Open Graph/Twitter, `robots.txt` e `sitemap.xml`. L'immagine social `whisper-social.jpg` deriva dalla sola conversione dell'artwork hero originale, 1200 × 832 px, 311.409 byte: non viene caricata nel normale layout della pagina. Questi metadati non attestano l'indicizzazione né una prova effettiva delle anteprime su WhatsApp/Instagram. Al passaggio al dominio definitivo aggiornare insieme canonical, URL e immagine OG, robots e sitemap.

### Cosa resta per il lancio — aggiornato alla r7

| Priorità | Decisione o materiale necessario | Stato / azione |
| --- | --- | --- |
| Percorso dal QR | Capitolo preciso da cui riprendere e lettura francese | EN/IT/ES attivi; il lettore arriva all’elenco capitoli. Confermare il punto di ripresa dal cartaceo; FR ancora indisponibile |
| Condizioni commerciali | Disponibilità, promo, bundle e modalità di vendita delle figure | Tre shop MangaSenpai e pagina ADH collegati; nessun checkout provato. Figure in anteprima, senza link di vendita |
| Prima del lancio definitivo | Contatto ufficiale, identità del responsabile e informativa pertinente ai servizi effettivi | Dati e documenti reali ancora da fornire; verificare anche il trattamento dei log dell’hosting |
| Continuità newsletter | Conservazione o migrazione della vecchia landing e del form | Destinazione esterna attiva e form osservato; test di iscrizione, conferma, consegna e doppio opt-in non eseguiti |
| Prima di stampare/distribuire QR | Dominio stabile, destinazione QR e verifica da smartphone | Decidere dominio; provare QR su carta e mantenere stabile il percorso di accesso |
| Revisione editoriale | Testi inglesi, terminologia, attribuzioni, copertine e materiali promozionali | Revisione finale di Andrea; non trasferire promesse stampate nelle locandine a tutte le offerte degli shop |
| Social | Canali realmente gestiti | Instagram e Facebook collegati; non occorre aprire altri profili per riempire il footer |
| Verifica finale | Safari iOS/Android reali, accessibilità, prestazioni e collegamenti | Test Chromium documentati in QA.md; non sostituiscono queste prove |
| Evoluzione | FAQ e misurazione del percorso QR → lettura/shop/social | Preparare risposte certe; scegliere analytics e configurazione privacy prima di attivarli |

Non è necessario aprire molti social: lettura, shop e newsletter hanno ora destinazioni reali. Restano aperti gli aspetti indicati sopra; le figure e i materiali promo restano presentazioni promozionali, non un catalogo di vendita gestito da questo sito.


## Collegamenti reali e collezione — revisione r7

Le informazioni fornite nelle schermate di Andrea e i collegamenti della sua landing `https://www.mangawhisper.com/join` aggiornano il brief: Patreon abbandonato; letture esterne EN/IT/ES, shop e newsletter già esistenti. I precedenti riferimenti a Patreon e a link tutti vuoti nelle sezioni storiche r2–r6 sono superati. Il francese per la lettura online rimane distinto dalla pagina commerciale ADH.

- Configurati `reading`, quattro destinazioni `shop`, `newsletterUrl`, `social.instagram` e `social.facebook`; `privacyUrl` resta vuoto.
- Facebook: il link di condivisione fornito porta al profilo `https://www.facebook.com/Virandart/`; nessun embed o pixel aggiunto.
- Newsletter: CTA verso la sezione `#HGGHHGGHGHGH` della landing originale, nella quale è stato osservato il form MailerLite. Non è stato effettuato alcun invio né verificato il doppio opt-in. La vecchia landing va mantenuta operativa finché il servizio non viene migrato e collaudato.
- Aggiunta una galleria delle quattro promo Bluetooth, Hake, Bluetooth · Secret promo e Lumisgrave, due anteprime di figure e un riquadro dell’edizione francese. Le associazioni delle grafiche descrivono il materiale del creatore; non garantiscono omaggi, quantità, stock, prezzi o validità attuale delle promozioni.
- Le figure non hanno una destinazione di acquisto verificata: restano anteprime e rimandano agli aggiornamenti della Guild. I prezzi eventualmente stampati negli artwork sono riferimenti promozionali, non prezzi di vendita gestiti dal sito.
- La cover francese rimanda ad ADH Éditions. Il sito dell’editore contiene un link a Ulule, ma lo stato corrente di quella campagna non è stato accertato: nessuna promessa di acquisto immediato o disponibilità.

### Provenienza e peso dei sette asset r7

Originali recuperati dalla landing esistente di Andrea, non dalle schermate WhatsApp. Copie sorgente e manifest in `10_PROGETTI/Whisper_Andrea_Virnicchi/Materiali_Drive_2026-10-16/shop-web/`; `sources.json` conserva URL CDN originali, dimensioni, percorso locale e file derivato. I sette WebP in `dist/assets/collection/`, a **960 × 960 px**, pesano complessivamente **770.592 byte**. Sono caricati in modo differito e ingrandibili nel dialog; nessuna immagine è stata ricreata con IA.

| Asset | Contenuto | Byte WebP |
| --- | --- | ---: |
| `french-source.webp` | Grafica della variant francese | 148.588 |
| `promo-bluetooth.webp` | Promo Bluetooth, associata alla regular nella grafica | 120.514 |
| `promo-hake.webp` | Promo Hake, associata alla Variant 01 nella grafica | 128.454 |
| `promo-lucca.webp` | Promo Bluetooth · Secret promo, associata alla Lucca nella grafica | 134.118 |
| `promo-halloween.webp` | Promo Lumisgrave / Halloween | 120.394 |
| `small-figures.webp` | Anteprima delle quattro figure piccole | 55.180 |
| `hake-figure.webp` | Anteprima Hake + Bluetooth | 63.344 |

Le fonti commerciali sono le schede MangaSenpai e la pagina ADH elencate nella configurazione. Le pagine prodotto sono state verificate senza ordini o pagamenti. Le condizioni di omaggio delle schede shop e le promo raffigurate possono differire: confermare l’offerta applicabile con Andrea e l’editore prima di formulare una promessa commerciale.
# Tre temi sulla stessa pagina completa — 17 ottobre 2026

La base richiesta dall'utente è questo sito, `whisper-world-andrea`, con tutte le sezioni e funzioni della r10. Il prototipo MailerLite separato non è la base da usare per questa richiesta.

Il comando **Theme**, in basso a destra, offre **Blue**, **Dark** e **Light**. Blue conserva esattamente `theme-adventure.css`; le altre due palette sono sovrapposizioni esclusivamente cromatiche in `dist/theme-palettes.css`. Nessuna sostituzione di immagini, elementi, contenuti, impaginazione o collegamenti. `styles.css`, `theme-adventure.css`, `config.js`, `app.js` e gli asset restano invariati.

`theme-switcher.js` cambia `data-theme` senza ricaricare: conserva sezione, scorrimento e stato dei componenti. La scelta compare nel parametro URL `?theme=dark` o `?theme=light`; Blue è il valore predefinito senza parametro. Non vengono creati cookie, analytics o nuove preferenze in localStorage. Il controllo è esterno al flusso della pagina; senza JavaScript rimane nascosto e si mantiene Blue.

## Revisione Virand — r12

La revisione del 17 ottobre applica il nuovo brief al sito completo: nome d'arte Virand, gerarchia del benvenuto, tipografia Cinzel, rune leggere, pulsanti lingua con bandiere, shop e prodotti più leggibili. `dist/whisper-portal.css` estende la r11: conserva i tre temi, le immagini originali, la struttura della Guild e le interazioni esistenti.

I prezzi sono centralizzati in `config.js` → `editionPricesCents`: Standard 890, Variant 01 e Lucca 990 centesimi. `creator-profile` è predisposto per fotografia e biografia definitive. Le nuove animazioni riutilizzano la pausa esistente e rispettano reduced motion. Nessuna nuova raccolta e-mail: resta il collegamento newsletter già presente.

XYMORE è il nome fornito dall'utente, ancora da verificare con una fonte ufficiale: edizione futura, senza associazione al vecchio collegamento ADH. Le promo non sono promesse indiscriminatamente in ogni ordine; l'offerta applicabile va confermata con l'editore.

Dettagli, fonti e risorse mancanti: [Revisione Virand](REVISIONE_VIRAND_2026-10-17.md). Verifiche e limiti: [QA](QA.md).


## Illustrazione iniziale animata — r13

Integrato il filmato fornito dall'utente il 17 ottobre 2026 nella hero, senza cambiare struttura, testi, collegamenti, temi o dissolvenze. L'immagine originale rimane come fallback e come contenuto del comando Explore the artwork.

`dist/hero-video.js` carica un solo MP4 dopo il caricamento iniziale della pagina, soltanto con animazioni abilitate e illustrazione visibile. Riproduzione in loop, silenziosa e inline. La pausa globale, la visibilità della scheda e l'uscita dell'illustrazione dallo schermo fermano il video. Movimento ridotto, Data Saver o rete 2G rilevabile mantengono l'immagine; eventuale autoplay negato conserva il fallback. Nessun nuovo player esterno, cookie o libreria.

Derivati H.264/yuv420p, faststart, 24 fps, circa 6 secondi, senza traccia audio: `assets/video/upland-animated-mobile.mp4` 640 × 450 / 1.018.558 byte; desktop `upland-animated.mp4` 960 × 676 / 2.059.537 byte. Originale 1136 × 800 / 13.815.325 byte conservato tra gli allegati dell'utente. La versione viene selezionata una volta al primo avvio (mobile fino a 800 px); il ridimensionamento non scarica un secondo file.


## Loop continuo e qualità nativa — r14

Correzione richiesta dall'utente: il filmato sorgente non nasce ciclico e la versione mobile r13 perdeva troppo dettaglio. La r14 usa **1136 × 800 su ogni dispositivo** e sostituisce il ritorno brusco finale→inizio con un percorso avanti/indietro di 18 secondi, rallentato dolcemente agli estremi tramite una curva coseno. Non vengono generati nuovi disegni, interpolati volti o sovrapposti fotogrammi in dissolvenza.

La sequenza si genera con `scripts/build-hero-loop.py SOURCE OUTPUT`: 24 fps, 432 fotogrammi, fine e inizio sulla stessa immagine. File MP4 H.264 di alta qualità, 23.139.137 byte, alla risoluzione nativa; non esiste più una variante mobile ridotta. Una prova VP9 è stata scartata perché risparmiava poco peso con minore fedeltà al sorgente. L'autore può fornire in futuro un master più grande per superare la risoluzione attuale senza ingrandimenti artificiali.

Pausa, avvio solo a scena visibile, movimento ridotto, Data Saver e immagine originale di fallback rimangono attivi. Il nuovo nome dei file evita che il browser continui a utilizzare il video precedente dalla cache. Il movimento è deliberatamente bidirezionale: per un ciclo sempre in avanti occorrerebbe una nuova animazione con posa iniziale/finale coerenti.


## Avvio senza effetto di sfocatura — r15

Rimossa la dissolvenza di 650 ms tra l'illustrazione statica e il video, che sovrapponeva due inquadrature diverse. Immagine iniziale, preload e poster video usano ora il primo fotogramma esatto del loop, salvato WebP lossless a 1136 × 800. Eliminato lo zoom CSS della sola immagine iniziale. Il video compare direttamente quando la riproduzione è pronta; i gradienti narrativi, il loop ad alta qualità e i controlli di accessibilità restano invariati. La vecchia illustrazione rimane disponibile con Explore the artwork.


## Movimento sempre avanti — r16

Superata la scelta bidirezionale r14: il video procede sempre in ordine cronologico a 24 fps, senza inversione né rallentamento agli estremi. Risoluzione nativa 1136 × 800, H.264 CRF21, 135 fotogrammi / 5,625 secondi, 9.527.222 byte. Il master non è ciclico: il raccordo usa una breve dissolvenza di 12 fotogrammi (0,5 s), non una promessa di continuità nativa. Per eliminarne ogni traccia serve un master disegnato come ciclo.

Ricetta riproducibile in scripts/build-hero-loop.py (FFmpeg + NumPy): parte dal fotogramma 12, prosegue fino al 134, poi sovrappone in avanti 135–146 a 0–11. Il confine del file corrisponde così a 11→12. Poster lossless ricavato dal primo fotogramma del nuovo MP4 e usato per img/preload/poster, con avvio privo di dissolvenza e zoom come in r15. Stessi controlli di pausa, movimento ridotto e risparmio dati.
