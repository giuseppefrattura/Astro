---
slug: integrare-i-video-di-facebook-nel-proprio-sito
published: true
title: Integrare i video di facebook nel proprio sito
publishDate: 23 Mar 2016
description: Come incorporare facilmente i video di Facebook nel proprio sito web
---

Da tempo ormai [Facebook](http://www.facebook.com) ha lanciato la sua piattaforma video che sta avendo molto successo, soprattutto perché all'interno del feed di facebook i video "interni" al social network sono preferiti a quelli provenienti da altri canali come youtube o vimeo.
Inoltre il vantaggio maggiore è che i video su facebook possono portare più facilmente ad avere dei feedback sulla propria pagina Facebook senza dover inserire link di alcun tipo.

<!--more-->

In generale quando si vuole caricare un video all'interno del proprio sito è sempre sconsigliato di caricarlo sul proprio server in quanto ogni visualizzazione consuma molta banda, conviene quindi inserirlo su siti come Vimeo, Youtube o appunto Facebook ed integrarlo nel proprio sito.

Per inserire un video di facebook servono davvero pochi passi ed una minima conoscenza dell'html,
Selezioniamo il video che vogliamo condividere ed assicuriamoci che sia condiviso pubblicamente;

![Facebook Video uno](../assets/Integrare-i-video-di-facebook-nel-proprio-sito/FacebookVideo1.jpg)

in alto a destra c'è una freccia verso il basso, selezionandola apparirà il menù a tendina, ora selezioniamo "Embed",

![Facebook Video embed](../assets/Integrare-i-video-di-facebook-nel-proprio-sito/FacebookVideo2.jpg)

si aprirà una finestra pop-up con un testo evidenziato, lo copiamo e lo incolliamo nella nostra pagina HTML.

![Facebook Video tag](../assets/Integrare-i-video-di-facebook-nel-proprio-sito/FacebookVideo3.jpg)

Il testo contiene due parti, la prima che comprende il tag

```html
<div id="fb-root"></div>
```

e lo script

```html
<script> … </script>
```

La seconda che è composta dal tag

```html
<div class="fb-video"..... </div>
```

è importante separare le due parti perché la prima va inserita solo una volta nel sito, la seconda è quella che contiene effettivamente il video. L'ideale è quindi inserire la prima parte nel footer del proprio sito e la seconda nella pagina dove si vuole mostrare il video.

### L'esempio di una pagina html con il video integrato

```html
<html>
<head>
    <title>Your Website Title</title>
</head>
<body>

<div id="fb-root"></div><script>(function(d, s, id) {  var js, fjs = d.getElementsByTagName(s)[0];  if (d.getElementById(id)) return;  js = d.createElement(s); js.id = id;  js.src = "//connect.facebook.net/it_IT/sdk.js#xfbml=1&version=v2.3";  fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script>


<div class="fb-video" data-allowfullscreen="1" data-href="https://www.facebook.com/montemagno/videos/999191343482016/" data-width="500">
  <div class="fb-xfbml-parse-ignore">
    <blockquote cite="https://www.facebook.com/montemagno/videos/999191343482016/">
      <a href="https://www.facebook.com/montemagno/videos/999191343482016/">3 lezioni di Marketing che possiamo imparare dalla Chiesa Prot...</a>
      <p>3 lezioni di Marketing che possiamo imparare dalla Chiesa Protestante di Brighton__Qui altri video:https://www.facebook.com/montemagno/videos</p>
      Pubblicato da
      <a href="https://www.facebook.com/montemagno/">Marco Monty Montemagno</a>
      su Martedì 22 marzo 2016
    </blockquote>
  </div>
</div>

</body>
</html>
```

Per vedere il risultato [clicca qui](http://giuseppefrattura.altervista.org/a.html)

Se si utilizza un cms come Joomla, Wordpress o Drupal è possibile fare un ottimizzazione inserendo la prima parte all'interno del template grafico del sito ( con Wordpress ad esempio lo si può fare anche con dei plugin ) e poi copiando la seconda parte all'interno dell'articolo o della pagina desiderata, facendo sempre attenzione di inserire il codice come codice HTML e non come testo.

Per ulteriori informazioni sull'embedding dei video ti consiglio la [pagina di facebook](https://developers.facebook.com/docs/plugins/embedded-video-player)

e [questo tutorial](http://www.wpbeginner.com/wp-tutorials/how-to-embed-a-facebook-video-in-wordpress/) di wpBeginner dove c'è una guida apposita per Wordpress.
