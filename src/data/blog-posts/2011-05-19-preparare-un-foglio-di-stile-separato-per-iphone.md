---
slug: preparare-un-foglio-di-stile-separato-per-iphone
published: true
title: Preparare un foglio di stile separato per iPhone
publishDate: 19 Mag 2011
description: Come differenziare lo stile CSS per dispositivi mobili.
---

Pu&ograve;&nbsp; essere utile in molti casi differenziare lo stile del proprio sito in base al dispositivo che lo visualizza, sia esso un tablet, uno smartphone o un desktop. Su device con display (e risoluzione) minore conviene avere dei bottoni pi&ugrave; grandi in modo da aumentare l&rsquo;usabilit&agrave; del sito.
<!--more-->
Il codice da inserire nell&rsquo; Head dell&rsquo;html &egrave;:

{% highlight html linenos %}//html code

<link rel="stylesheet" type="text/css" href="iphone.css" media="only screen and (max-width: 480px)"/>
<link rel="stylesheet" type="text/css" href="desktop.css" media=" screen and (min-width: 481px)" />

<!–[if IE]>
<link rel="stylesheet" type="text/css" href="explorer.css" media="all" />
<![endif]->
{% endhighlight %}


<p>Internet Explorer come al solito non supporta la diversificazione del css in base all&rsquo;attributo media, quindi necessita di un caricamento a parte, explorer.css pu&ograve; essere sostituito con desktop.css a meno che non si voglia creare un css personalizzato per Internet Eplorer ed un altro per gli altri browser.</p>
