---
slug: gwt-cosa-sono-e-come-si-usano
published: true
title: Gwt cosa sono e come si usano
publishDate: 15 Jun 2011
description: Introduzione a GWT, framework per web app in Java.
---

GWT sta per Google Web Toolkit ed un framework molto potente per costruire web app conoscendo “solo” il linguaggio JAVA. Tramite le sue potentissime librerie è possibile creare sia la parte client che server e farle comunicare tramite il protocollo AJAX in pochissimi passi.

## Cosa comporta l’uso del protocollo di comunicazione AJAX?

L’acronimo AJAX sta per Asynchronous JavaScript and XML, a differenza di quello che credono in molti non è un linguaggio a sé, ma è solo un modo diverso di aggiornare o modificare una pagina web. Tramite questa tecnologia è possibile caricare parte di dati di una pagina client dal server senza aver bisogno di ricaricare l’intera pagina da capo, questo caricamento avviene tramite una richiesta di un file XML tramite Javascript. L’esempio classico di applicazione AJAX è Facebook, se notate quando siete sulla vostra bacheca o nella home (una volta loggati) e andate verso il basso vedrete il link “Post precedenti”, ma cliccandoci sopra vedrete i post precedenti ma senza dover ricaricare l’intera pagina da capo.

Creare un’applicazione del genere non è facile e richiede la conoscenza di almeno due linguaggi di programmazione, uno per implementare il lato server, che si occupa della creazione dei contenuti, ed un altro linguaggio, il Javascript, per poter aggiornare la pagina in base ad eventi particolari effettuati dall’utente sulla sua macchina.

GWT si propone di agevolare lo sviluppo di questo tipo di web application tramite l’utilizzo appunto di un solo linguaggio sia per lato server che per lato client. In realtà effettua una conversione del codice java in javascript per il lato client mentre crea delle servlet lato server.

Dopo diversi anni di sviluppo GWT è diventato un framework sicuro e funzionale, molto usato e con una grande documentazione alle spalle. Oltre GWT ho avuto modo di lavorare con la libreria “smartGWT” che consente con grande facilità di poter creare tabelle, alberi di navigazione, finestre e quant’altro senza alcuno sforzo.

Vi suggerisco di visitare i siti di:

- [Google GWT](http://code.google.com/intl/it-IT/webtoolkit)
- [SmartGWT](http://code.google.com/p/smartgwt/)
- [SmartGWT Showcase](http://www.smartclient.com/smartgwt/showcase/#main)
