# Ottimizzazioni implementate — 22 ottobre 2026

## Modifiche

- Dominio pubblico, canonical e metadati social coerenti con la route. Sitemap generata da contenuti e pagine del blog e dichiarata in robots.txt.
- Redirect statici per `/blog/1/` verso `/blog/` e `/1index/` verso `/`; il vecchio template è conservato solo come esempio in questa cartella.
- Lingua italiana, titolo principale della homepage, descrizioni e alt pertinenti, link per saltare al contenuto, nome accessibile del logo e controlli audio utilizzabili da tastiera.
- Componente condiviso per gli elenchi e paginazione precedente/successiva con pagina corrente; niente fila di 16 numeri su mobile.
- Avatar con spazio quadrato riservato, margini senza sovrapposizioni e varianti 300/600 px. Font con display optional e preload del carattere del corpo: su una prima visita lenta può rimanere il font di sistema, evitando un cambio tardivo delle metriche.
- Immagini Markdown locali responsive con sizes legato alla colonna degli articoli; prima immagine locale prioritaria. Ritratto della pagina links locale e ottimizzato; contrasto e larghezza dei link corretti.
- Undici iframe degli articoli sostituiti da anteprime con caricamento del player solo dopo interazione, dimensioni adattabili, titoli e link alternativo. La homepage usa lo stesso player. YouTube usa il dominio youtube-nocookie; nessun iframe presente all'apertura.
- Cinque URL di post Instagram, impropriamente usati come immagini, trasformati in link alle foto originali.
- Sentry non distingue più gli audit dagli utenti: errori e tracing rimangono immediati, il replay è separato e attivato dopo load/inattività (timeout 2 s). Il replay non contiene la fase iniziale precedente all'attivazione; eventuali errori in quella fase sono comunque segnalati. Campionamenti e mascheramento del replay invariati. Telemetria ancora disabilitata su localhost.
- Configurazione Markdown migrata a unified, eliminando il relativo avviso di deprecazione.
- Controllo dell'output con `npm run check:site`, eseguito anche in CI dopo la build.

## Cache e deploy preparati

Il workflow ora ricopia gli oggetti, assegnando Cache-Control anche agli asset già esistenti:

- `/_astro/`: `public,max-age=31536000,immutable`, per file con hash.
- `/assets/`: `public,max-age=86400`, per file senza hash.
- HTML e altri file: `public,max-age=0,must-revalidate`.

Gli asset vengono caricati prima dell'HTML. Il workflow continua a invalidare CloudFront dopo la copia. Nessun deploy o modifica AWS è stato eseguito in questa sessione. La policy di CloudFront deve rispettare gli header origin: verificare i TTL e gli header effettivi dopo il prossimo deploy. La copia completa costa più trasferimento rispetto alla vecchia sync ma aggiorna in modo deterministico i metadati esistenti.

Il workflow passa `secrets.SENTRY_AUTH_TOKEN` alla build; il secret deve esistere in GitHub per pubblicare release e source map. Senza secret il sito continua a compilare, con l'avviso Sentry già esistente.

Non sono introdotte cancellazioni generalizzate dal bucket. I due vecchi URL ricevono nuovi file di redirect al prossimo deploy; le altre eventuali route obsolete su S3 richiedono un inventario separato. I redirect generati per hosting statico sono HTML con meta refresh, non risposte HTTP 301: per ottenere 301 occorre una regola CloudFront.

## Verifiche

- Build riuscita e controllo automatico su 176 pagine pubbliche, più i due redirect: lingua, canonical, URL social, sitemap, asset locali e srcset, video e paginazione.
- Riproduzione dell'overflow prima della correzione: pagina blog a viewport 320 px, contenuto largo 640 px. Dopo: 320 px.
- Verifica nel browser di homepage, blog, seconda pagina, links, suoni e articolo NAS con video alle larghezze 320, 375, 768 e 1440 px: nessuno scroll orizzontale.
- Player YouTube attivato con Invio: iframe creato solo dopo l'interazione e focus trasferito al player.
- Cambio tema da tastiera e navigazione client homepage → blog: selezione conservata, nessun errore console nel percorso controllato.
- Bundle principale iniziale: circa 49,7 KiB gzip, contro 87,7 KiB della build dell'audit iniziale. Replay separato: circa 39,8 KiB gzip, scaricato successivamente. Il confronto include gli aggiornamenti delle dipendenze intervenuti tra le due revisioni: non attribuire tutta la differenza a una singola modifica. Il totale scaricato dopo load non diminuisce nella stessa misura.

## Limiti da verificare in produzione

Non sono stati misurati nuovi punteggi Google sulla versione modificata, che è ancora locale. Non si dichiara raggiunto un nuovo valore CLS: spazio dell'avatar e caricamento dei font sono stati stabilizzati, ma il risultato con rete lenta va rimisurato dopo il deploy.

Le immagini esterne storiche non sono state scaricate o ridimensionate automaticamente: disponibilità, dimensioni reali e diritti richiedono verifiche puntuali. Il controllo automatico valida i file locali e la struttura del sito, non la raggiungibilità di tutti i siti esterni o l'accessibilità completa. Il warning sulle source map di astro:transitions resta a carico della toolchain.
