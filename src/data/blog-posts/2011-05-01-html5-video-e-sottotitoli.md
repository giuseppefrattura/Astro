---
slug: html5-video-e-sottotitoli
published: true
title: Html5 video e sottotitoli
publishDate: 01 Mag 2011
description: Utilizzo di jQuery per aggiungere sottotitoli ai video HTML5.
---

Come da me scritto in un precedente articolo il supporto dell'html5 ai sottotitoli nei video è molto limitato. Per fortuna vengono in nostro aiuto jQuery e Jquery.srt due librerie create per velocizzare il lavoro di molti programmatori.

## Esempio di codice

```html
<!DOCTYPE html>
<html>
<head>
<title>Pagina di esempio</title>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script>
<script type="text/javascript" src="http://v2v.cc/~j/jquery.srt/jquery.srt.js"></script>
</head>
<body>
<video id="video" >
<source src="video.mp4" type="video/mp4" />
Your browser does not support HTML5 video.
</video>
<nodoaCaso data-video="video" data-srt="sottotitolo.srt" />
</body>
</html>
```

Da notare che l'attributo `data-video` del nodo inserito deve essere uguale all'id del video. Nella pagina così creata i sottotitoli saranno visti sotto il video. Per modificarne lo stile sarà necessario utilizzare i CSS.
