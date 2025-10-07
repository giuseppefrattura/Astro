---
slug: html5-canvas-il-loro-utilizzo-piu-semplice
published: true
title: HTML5 Canvas, il loro utilizzo più semplice
publishDate: 27 Dec 2011
description: Una guida semplice per utilizzare HTML5 Canvas in modo efficace.
---

Tra le tante novità di HTML5 una di quelle più interessanti è sicuramente la possibilità di inserire grafica vettoriale all’interno delle proprie pagine web. In un esempio che ho trovato on-line, c’era come stampare il proprio nome come un’immagine sulla pagina web ed è così che ho pensato che sarebbe stato molto utile poter visualizzare il proprio indirizzo email senza paura di ricevere dello spam. Ecco come deve essere fatta una pagina html5 per creare un immagine con un testo all’interno, in questo caso la mia mail.

## Esempio di codice

```html
<!DOCTYPE html>
<html>
<head>
<title> Prova canvas<br />
<script type="text/javascript">
window.onload=function(){
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.fillStyle = 'black';
context.fillRect(0,0,400,100);
context.textBaseline='top';
context.font = 'bold 15pt Tahoma';
context.fillStyle='orange';
context.fillText('admin@giuseppefrattura.it',15,35);
}
</script>
</head>
<body>
<canvas id="canvas" width="400" height="100">
Errore il tuo browser non supporta il canvas dell'HTML5
</canvas>
</body>
</html>
```