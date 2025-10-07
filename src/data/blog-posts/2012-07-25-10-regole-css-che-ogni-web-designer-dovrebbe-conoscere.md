---
slug: 10-regole-css-che-ogni-web-designer-dovrebbe-conoscere
published: true
title: 10 Regole CSS3 che ogni web designer dovrebbe conoscere
publishDate: 25 Jul 2012
description: Una guida alle regole CSS3 fondamentali per il web design moderno
---

Eccovi dieci regole CSS che ogni web designer dovrebbe conoscere

<!--more-->

### @media

```css
@media screen and (max-width: 960px) {
...
}
```

La regola media permette di specificare il layout di stampa del sito ed è anche alla base della creazione di pagine web responsive usando come attributo del campo media min-width si specificano le regole da applicare al sito quando è visualizzato su un display di determinate dimensioni.

### Background-size

```css
body {
  background: url(image.jpg) no-repeat;
  background-size: 100%;
}
```

Permette di riempire con un'immagine il 100% del body nel caso dell'esempio.

### @font-face

```css
@font-face {
  font-family: Blackout;
  src: url("assests/blackout.ttf") format("truetype");
}
```

Permette di scegliere con facilità i font da usare all'interno delle pagine selezionandoli manualmente da risorse gratuite o via google WebFonts o Typekit.

### margin 0 auto;

```css
#container {
  margin: 0 auto;
}
```

Serve a centrare qualsiasi blocco all'interno del blocco che a sua volta lo contiene.

### Overflow:hidden

```css
.container {
  overflow: hidden;
}
```

Un modo semplice per nascondere i contenuti che escono fuori da .container.

### .clearfix

```css
.clearfix:after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
}
```

Fa lo stesso lavoro di overflow:hidden quando quest'ultimo non funziona

### Color: rgba();

```css
.btn {
  color: rgba(0,0,0,0.5);
}
```

Con rgba si può impostare il colore di un elemento compresa la sua componente alpha che ne determina la trasparenza.

### Input [type:"text"]

```css
input[type="text"] {
  width: 200px;
}
```

Serve per modificare gli stili applicati ai campi delle form.

### Trasform: rotate(30deg)

```css 
.title {
  transform: rotate(30deg);
}
```

Transform permette di effettuare trasformazioni senza utilizzare javascript.

### outline:none;

```css
A {
  outline:none;
}
```

Permette di eliminare gli outline attorno agli elementi che preferisci.

Ref.
[http://line25.com/articles/10-css-rules-every-web-designer-should-know](http://line25.com/articles/10-css-rules-every-web-designer-should-know)
