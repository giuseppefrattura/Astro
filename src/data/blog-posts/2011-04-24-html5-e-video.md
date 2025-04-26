---
slug: html5-e-video
published: true
title: HTML5 e video
publishDate: 24 Apr 2011
description: Introduzione all'uso dei video in HTML5 senza Flash.
---

Una delle grandi innovazioni dell’HTML5 è la possibilità di introdurre dei video direttamente dal codice html senza l’aggiunta di componenti esterni come FLASH. In questo breve articolo vedremo come fare ma prima bisogna riflettere un attimo sul fatto che l’HTML5 non è ancora uno standard definito, lo sarà nel 2012, a patto che non venga la fine del mondo, per questo è meglio non affezionarsi molto ad alcuni dei suoi nuovi comandi, in quanto potrebbero cambiare.

In realtà l’HTML5 rende banale l’utilizzo o dei video, il codice da inserire nella pagina web è sostanzialmente:

```html
<video attributi del video(o del player)>
<source src='percorso del video'>
</video>
```

Un esempio può essere:

```html
<video controls autplay preload autobuffer id="myvideo" tabindex="0">
<source src="http://www.nicedesign.be/subtitler/screencast.theora.ogv" type="video/ogg"/>
<source src="http://www.nicedesign.be/subtitler/screencast.mp4" type="video/mp4"/>
Il tuo browser non supporta l’HTML5
</video>
```

Il browser proverà a riprodurre il contenuto del primo elemento source, in caso negativo proverà col secondo, se dovessero andare male entrambi vorrà dire che il browser non supporta l’HTML5. Anche per quello che concerne il supporto allo standard ci sono vari problemi, in quanto ci sono dei browser che supportano determinate caratteristiche ed altri che ne supportano altre, quindi prima di creare web app con questo nuovo linguaggio bisogna stare attenti che la propria utenza possa usufruirne correttamente.

Un difetto riscontrato al momento è la mancanza di supporto ai sottotitoli.

Per altri esempi visitate [http://html5demos.com](http://html5demos.com) dove troverete un insieme di Demo delle varie caratteristiche dell’HTML5.
