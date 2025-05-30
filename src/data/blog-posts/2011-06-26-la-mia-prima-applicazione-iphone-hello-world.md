---
slug: la-mia-prima-applicazione-iphone-hello-world
published: true
title: La mia prima applicazione iPhone Hello World
publishDate: 26 giu 2011
description: Tutorial per creare una semplice app iPhone con Xcode.
---

Per creare applicazioni iPhone serve sicuramente avere un MAC, con sistema operativo snow leopard, preferibilmente aggiornato all'ultima versione. Vediamo come creare in modo semplice e senza toccare una riga di codice la nostra prima applicazione "Hello World", in questo tutorial ho usato Xcode 4, ciò non toglie che è possibile effettuare le stesse cose anche con una versione precedente della IDE Apple.

### Per prima cosa lanciamo Xcode:

![Xcode Apertura](../assets/NewXcodeProject.jpg "Xcode Apertura")

Andiamo su "Crea un nuovo progetto Xcode", da lì ci apparirà la schermata:

![Crea ViewBased Application](../assets/ViewBasedApplication.jpg "Crea ViewBased Application")

Per selezionare il tipo di applicazione da creare, lasciamo la scelta di Default: "View based Application" ed andiamo avanti dove ci verrà richiesto il nome dell'applicazione, l'identificativo della compagnia o comunque dell'autore e la famiglia di dispositivi per la quale l'applicazione sarà costruita.

![Inserisci il nome dell'applicazione](../assets/ProductName.jpg "Schermata 2011-06-26 a 19.09.56")

Andiamo avanti ancora ed avremo finito il settaggio iniziale dell'applicazione e potremo iniziare a lavorare con Xcode. Ecco la schermata iniziale di XCode:

![Specifica il target](../assets/Target.jpg "Schermata 2011-06-26 a 19.10.20")

C'è la possibilità di cambiare nome ed i settaggi immessi prima, si possono impostare le icone e l'immagine iniziale sia per dispositivi muniti e non di Retina Display, è possibile inoltre scegliere l'SDK da utilizzare. Nella barra a sinistra noteremo tra i vari file un file "CiaoMondoViewController.xib", cliccandoci una volta sopra vedremo l'interfaccia grafica dell'iPhone:

![ViewController](../assets/ViewController.jpg "Schermata 2011-06-26 a 19.13.44")

Ora se clicchiamo sul bottone evidenziato in rosso (in alto a destra) si aprirà la barra laterale destra che nella parte bassa contiene tutti gli elementi che possiamo inserire nell'applicazione. Selezioniamo "Label" ed trasciniamolo sul disegno a forma di iPhone:

![Crea un label](../assets/CreateLabel.jpg "Schermata 2011-06-26 a 19.14.06")

Clicchiamo due volte sull'oggetto appena trascinato così da poterci scrivere all'interno "Hello World" o qualsiasi saluto vogliate. Ora salvate, cliccate sul tasto RUN in alto a sinistra (a forma di play) e dovrebbe apparire il simulatore di iPhone a salutarvi!!!

![Risultato](../assets/CiaoMondo.jpg "Schermata 2011-06-26 a 19.15.14")
