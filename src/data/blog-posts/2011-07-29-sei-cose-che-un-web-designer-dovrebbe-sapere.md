---
slug: sei-cose-web-designer
published: true
title: Sei cose che un Web Designer dovrebbe sapere
publishDate: 29 Aug 2011
description: Consigli utili per Web Designer su problemi comuni.
---

Durante i miei vari lavori da Web Designer, sia freelance che dipendente, ho imparato tanto e soprattutto ho incontrato tanti tipi di problemi di natura tecnica che appartengono al tipo di sviluppo. Quando si sviluppa per il web bisogna far conto che ogni utente può vedere un sito da un device con caratteristiche differenti, in particolare la risoluzione del display, il browser e la potenza computazionale del device. Ti lascio sei cose che ho imparato e alle quali è sempre bene dare attenzione prima di dire al cliente che è tutto ok.

### 1. Funziona sul mio Browser funzionerà su tutti
Non è così, ogni Browser interpreta a modo suo un sito internet ed i linguaggi con i quali esso funziona lato client. Fondamentalmente le differenze sono dal punto di vista della resa del Javascript e della visualizzazione dei CSS, ma anche i Fonts, che cambiano da Mac a Windows e Linux, possono portare il proprio sito a non essere bello da vedere su tutti i browser. Per i Fonts la soluzione è l’utilizzo dei Web Fonts che vengono scaricati insieme alla pagina web e che non hanno quindi limitazione di Sistema operativo o Browser, qui trovate un link che spiega dove scaricarli e come usarli per le vostre pagine [http://www.google.com/webfonts](http://www.google.com/webfonts). Per i CSS bisogna invece testarli manualmente su tutti i browser, magari dando un occhio ai browser più utilizzati come IE7, Firefox 4 ecc...

### 2. Si vede bene con la risoluzione del mio monitor, ok non ci sono problemi
Se si ha intenzione di mostrare un contenuto su internet si deve pensare che le risoluzioni dei monitor sono varie e vanno dai 15” ai 30”, senza contare tablet, cellulari e netbook. Non c’è bisogno di un CSS per ogni risoluzione possibile, anche perché sarebbe impossibile prevederle. Basta però usare all’interno dei CSS valori in percentuale e non assoluti o in pixel, laddove non necessari, anche qui può convenire effettuare uno o più test con risoluzioni diverse, soprattutto verificando che il sito si veda bene sia su risoluzioni 4:3 che su 16:9 e 16:10.

### 3. Ma se metto un menù serve il tasto indietro?
Il tasto indietro serve sempre, e va messo in ogni pagina (tranne nella home page ovviamente), indipendentemente dalla presenza dei menù, oltre al menù è molto utile per la navigabilità che il logo del sito rimandi alla home page. Creare siti con link ridondanti non è un problema per i crawler di Google e degli altri motori di ricerca che nel 2011 non dovrebbero bloccarsi in loop infiniti, invece migliora molto l’esperienza dell’utente che non è costratto a cercare per tutta la pagina un collegamento.

### 4. Cache, a che serve svuotarla??
I browser velocizzano la ri-apertura delle pagine web tramite l’utilizzo di una cache, quindi se andiamo a modificare un sito potremmo non notare subito le modifiche, in particolare se modifichiamo codice Javascript o CSS linkato dalla pagina di nostro interesse. Proprio per questo è buona norma svuotare sempre la cache quando si fanno modifiche ad un sito. Se si fanno operazioni con sessioni, quindi con Log-in e Log-out, è meglio cancellare anche i Cookie.

### 5. Un sito bello deve essere fatto con tanti contenuti Flash, ed mp3 di sottofondo!
Assolutamente no, la maggiorparte degli utenti è interessato ai contenuti di un sito e non a video flash o altro. Il messaggio che si vuole comunicare deve essere istantaneo e facile da raggiungere. Esistono molti siti di moda che partono con una musica e contenuti in flash, se un utente vuole vedere le novità di una determinata stagione o un capo particolare impiegherà molto tempo soprattutto se non ha una connessione a banda larga. Yoox invece è un negozio online di articoli di abbigliamento alla moda, ha dei contenuti audio/video ma attivabili su richiesta dell’utente tramite la pressione di un tasto play. Le anteprime dei capi sono immagini a bassa risoluzione, poi se si seleziona un singolo capo si vede un immagine più grande che può a sua volta essere ancora ingrandita.

### 6. Facendo siti a prezzo basso con Wordpress o Joomla guadagnerò facilmente senza sforzi
In molti vendono siti per poche centinaia di euro, sperando di guadagnare molto rispetto al tempo impiegato per farli, inoltre la quantità di persone che per un sito vogliono spendere meno di mille euro è molto alta. Il problema è che ogni cliente porta con se varie problematiche, non basta un buon template, spesso c’è bisogno di qualche piccola modifica o di un applicativo ad hoc. Ragion per cui si può arrivare a perdere più del tempo previsto per la creazione di un singolo sito.
