---
slug: cambiare-formato-screenshot-mac
published: true
title: Cambiare formato agli screenshot su Mac
publishDate: 13 Apr 2018
description: Come modificare il formato predefinito degli screenshot su macOS
---

Su mac è possibile creare uno screenshot del desktop con la combinazione di tasti cmd + shift + 3, questo comando crea un'immagine png sul desktop. In questa breve guida vedremo come cambiare formato alle immagini così create.

<!--more-->

Sui sistemi operativi Apple da tantissimi anni ormai è possibile usare la combinazione di tasti cmd + shift + 3 per eseguire uno screenshot di tutto lo schermo o cmd + shift + 4 per eseguire lo screenshot di una parte di esso. Il formato del file è sempre png ma esiste un modo per cambiarlo.

Per prima cosa bisogna lanciare il terminale, ci sono due modi:
andare nella cartella Applicazioni->Utility e cercare l'app "terminale" oppure premere cmd + spazio, scrivere "terminale" e premere invio.

Nella finestra del terminale copiate ed incollate il seguente comando:

**defaults write com.apple.screencapture type jpg;killall SystemUIServer**

Da ora ogni screenshot sarà in formato jpg. Gli altri formati possibili sono GIF, PDF e TIFF, li potete attivare inserendo i seguenti comandi:

- **GIF**: defaults write com.apple.screencapture type gif;killall SystemUIServer
- **PDF**: defaults write com.apple.screencapture type pdf;killall SystemUIServer  
- **TIFF**: defaults write com.apple.screencapture type tiff;killall SystemUIServer

Fonti:
- [Hongkiat](https://www.hongkiat.com/blog/change-macos-screenshot-file-format)
- [Attivissimo](https://attivissimo.blogspot.it/2014/12/os-x-cambiare-il-formato-degli.html)
