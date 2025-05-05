---
slug: hello-world-html5
published: true
title: Hello World HTML5
publishDate: 11 Nov 2014
description: Guida introduttiva allo sviluppo web con HTML5
---

Con questo articolo inizio una serie dedicata all'HTML5, si inizierà dalle basi fino ad arrivare ad articoli più complessi. Ogni articolo avrà un esempio da scaricare nel quale verrà spiegato quanto scritto nell'articolo.

<!--more-->

L'HTML5 è l'ultima versione del linguaggio di markup più diffuso al mondo, è in continuo sviluppo e non tutte le caratteristiche sono presenti in tutti i browser. Prima di iniziare è bene descrivere cosa si intende per HTML5, in realtà è un insieme di tecnologie le principali delle quali sono:

- HTML
- CSS
- JavaScript

Un documento HTML è diviso in due sezioni principali:

- Head: contenente i metadati del documento
- Body: contenente il contenuto vero e proprio

In questo primo articolo creeremo un semplice documento HTML5, iniziamo con il creare un file di testo che chiameremo index.html (è prassi chiamare la pagina principale di un sito index), al suo interno mettiamo il seguente codice:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Hello World!</title>
    </head>
    <body>
        <h1>Hello World!</h1>
    </body>
</html>
```

La prima riga indica che il documento è in HTML5, in questo modo i browser sapranno come interpretare il documento.
Il tag html invece indica l'inizio del documento vero e proprio, al suo interno mettiamo i tag head e body.
All'interno dell'head inseriamo due tag:

- meta charset: indica che il documento è codificato in UTF-8
- title: indica il titolo del documento

All'interno del body inseriamo un tag h1 (header 1) con il testo Hello World.

Se apriamo il file con un browser vedremo il testo Hello World! scritto con un carattere grande (h1 è il tag per i titoli di livello 1, il più alto).

Nel [prossimo articolo](/html5-come-creare-pagine-web) vedremo come inserire link, immagini ed altri elementi fondamentali.