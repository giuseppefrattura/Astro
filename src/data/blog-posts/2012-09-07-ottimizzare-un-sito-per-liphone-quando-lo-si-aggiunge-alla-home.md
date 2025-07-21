---
slug: ottimizzare-un-sito-per-liphone-quando-lo-si-aggiunge-alla-home
published: true
title: Ottimizzare un sito per l'iPhone quando lo si aggiunge alla home
publishDate: 07 Sep 2012
description: Guide per ottimizzare il tuo sito web quando viene aggiunto alla home screen di iOS
---

Quando dal proprio iPhone o iPad si naviga in internet con Safari si ha la possibilità di aggiungere un sito alla home, rendendolo accessibile tramite un'icona esattamente come se fosse un'applicazione.

<!--more-->

In questo articolo voglio darti tre codici che ti aiuteranno a rendere più curato il tuo sito web.

### L'icona dell'applicazione
Si può personalizzare usando i seguenti metatag:

Per l'icona normale:
```html
<link rel="apple-touch-icon" href="img/icon.png"/>
```

Per eliminare l'effetto Gloss sull'icona:
```html
<link rel="apple-touch-icon-precomposed" href="img/icon.png"/>
```

Icona ottimizzata per iPhone4 o New iPad:
```html
<link rel="apple-touch-icon" sizes="114x114" href="img/icon-iphone4.png"/>
```

Lo splash screen è un'immagine che viene mostrata all'avvio dell'applicazione, per visualizzarla dobbiamo usare un'immagine di 320x460 pixel ed inserire il codice:

```html
<link rel="apple-touch-startup-image" href="img/splash.png" />
```
