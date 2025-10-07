---
slug: come-sviluppare-plugin-per-photoshop
published: true
title: Come sviluppare plug-in per Photoshop
publishDate: 15 Apr 2011
description: Introduzione allo sviluppo di plug-in per Photoshop.
---


<p>Negli ultimi mesi mi &egrave; capitato di dover smanettare con Adobe Photoshop CS5 per creare un Plug-in. Innanzitutto &egrave; quasi impossibile scrivere un Plug-in da zero, perquesto la cosa migliore &egrave; andare sul sito della adobe e scaricare le sdk per Photoshop, che si trovano all&rsquo;indirizzo</p>
<!--more-->
<a href="http://www.adobe.com/devnet/photoshop/sdk.html">http:/www.adobe.com/devnet/photoshop/sdk.html</a> .


<h3>Su che ambiente lavoriamo?</h3>

<p>Se si lavora su Windows &egrave; consigliato utilizzare Visual studio mentre su MacOsX &egrave; consigliato l&rsquo;utilizzo di Xcode. E&rsquo; sicuramente possibile utilizzare altre ide ma renderebbe la parte di building del progetto molto pi&ugrave; complesso.</p>

<h3>Da dove iniziamo?</h3>

<p>Io personalmente ho iniziato a lavorare prendendo in esempio il filtro dissolve. Sia nella versione Windows che per Mac si aprire il file del progetto che contiene all&rsquo;interno svariate configurazioni per la nostra IDE. Si pu&ograve; scegliere infatti di compilare il codice sia per architetture a 32 che a 64bit.</p>

<h3>Il Main</h3>

<p>Essendo il plug-in una libreria non &egrave; eseguibile, abbiamo quindi 2 problemi:</p>
<p>1) Da dove parte? Qual&rsquo;&egrave; il MAIN?</p>
<p>2) Come facciamo ad eseguire un debug?</p>
<p>Iniziamo subito con il primo problema, il main nel nostro caso &egrave; contenuto all&rsquo;interno del file &ldquo;Dissolve.cpp&rdquo; allo stesso modo il main &egrave; sempre contenuto all&rsquo;interno del file cpp con lo stesso nome del progetto. In particolare il plug-in una volta lanciato da Photoshop lancia tutte le sue istruzioni a partire dal metodo &ldquo;<strong>DLLExport MACPASCAL void PluginMain</strong>&rdquo; .</p>
<p>All&rsquo;interno del codice del main notiamo uno switch, questo &egrave; il cuore del plug-in</p>

```ruby
switch (selector)
{
case filterSelectorAbout:
break;
case filterSelectorParameters:
break;
case filterSelectorPrepare:
break;
case filterSelectorStart:
break;
case filterSelectorContinue:
break;
case filterSelectorFinish:
break;
default:
break;
}
```

<p>Il codice del Main viene chiamato pi&ugrave; volte con diversi &nbsp;Selector, vediamo nello switch c&rsquo;&egrave; &ldquo;about&rdquo;, &ldquo;Parameters&rdquo;, &ldquo;Prepare&rdquo;, &ldquo;start&rdquo;, &ldquo;continue&rdquo; e &ldquo;Finish&rdquo;. &nbsp;Questi sono gli stati che pu&ograve; avere un plug-in e per ogniuno di essi &egrave; possibile chiamare una o pi&ugrave; procedure a piacimento.</p>

<h3>Compilazione e Build</h3>

<p>Una volta eseguita la build del nostro codice possiamo andare nella cartella &ldquo;samplecode/output&rdquo; ed all&rsquo;interno troveremo il file pronto per essere copiato nella directory dei plug-in di Photoshop.</p>
<h3>Debug</h3>

<p>Il Debug su un progetto di questa grandezza &egrave; sicuramente necessario ma non immediato, ed &egrave; qu&igrave; che ci viene in aiuto visual studio. Per eseguire il debug bisogna compilare il progetto in modalit&agrave; Debug, nella cartella dell&rsquo;output &nbsp;vedremo la presenza di un file &ldquo;.ilk&rdquo; oltre al nostro plugin, bisogna copiare questo file insieme al plug-in nella directory apposita di Photoshop. Fatto questo si lancia Photoshop e si crea o si apre un immagine. Ora si deve tornare su Visual studio e cliccare su strumenti->connetti a processo e da li selezionare Photoshop, mettete i breakpoint dove necessario e lanciate il plugin da photoshop, ora il debug dovrebbe funzionare normalmente.</p>
<p>Per info ed approfondimenti vi consiglio di leggere tutta la manualistica presente nel file dell&rsquo;SDK di Adobe e di andare su:</p>
<p><a href="http://www.mactech.com/articles/mactech/Vol.15/15.04/PhotoshopPlug-InsPart1/index.html">http://www.mactech.com/articles/mactech/Vol.15/15.04/PhotoshopPlug-InsPart1/index.html</a>
</p>
<p><a href="http://www.squidoo.com/Programming-Photoshop-Plugins">http://www.squidoo.com/Programming-Photoshop-Plugins</a></p>
<p><a href="http://www.photoshoproadmap.com/Photoshop-blog/2006/10/23/programming-photoshop-plugins">http://www.photoshoproadmap.com/Photoshop-blog/2006/10/23/programming-photoshop-plugins</a>
</p>
