---
slug: creare-un-app-iphone-con-swift-in-pochi-minuti
published: true
title: Creare un app iPhone con Swift in pochi minuti
publishDate: 09 Oct 2014
description: Tutorial Apple per creare un'applicazione per iDevice con iOS 8 in Swift.
---

Apple ha rilasciato sul [blog di Swift](https://developer.apple.com/swift/blog), il suo nuovo linguaggio di programmazione, [un tutorial](https://developer.apple.com/swift/blog/?id=16) per creare un applicazione per iDevice con iOs 8 in pochi minuti.

<!--more-->

L'app consente di applicare in modo random un filtro su un immagine preimpostata. Questo tutorial mostra anche alcune delle principali differenze tra Swift e Objective-C.

Una di queste è la mancanza del file .h, tutto il codice è solo sui file .swift; non è necessario dichiarare il tipo delle variabili nonostante swift sia un linguaggio fortemente tipato (come il C o il Java) quando si crea una variabile questa diventa del tipo adatto e non può più cambiare.

L'IDE assiste lo sviluppatore con automazioni presenti per altri linguaggi come il Java dove invocata una classe l'IDE suggerisce, con la possibilità di autocompletamento, i metodi della classe stessa.

<video src="http://devstreaming.apple.com/videos/swift/assets/xcode-hd.mp4" poster="/swift/blog/images/poster800x500_2x.png" autoplay="true" controls="" data-hires-status="pending" style="width: 100%;"></video>

Vediamo nel dettaglio il tutorial:

- Per prima cosa si crea un nuovo progetto Xcode e si seleziona il linguaggio Swift al posto di Objective-C
- Si inserisce l'immagine all'interno del progetto
- Utilizzando La storyboard si inserisce un imageview e ne si imposta l'immagine contenuta in maniera statica
- Si imposta l'Auto Layout in modo da poter sempre visualizzare bene l'immagine anche su dispositivi diversi
- Si incorpora l'intero View Controller all'interno di un Navigation Controller in modo da poter avere una barra di navigazione dove impostare un nome ed una barra inferiore dove inserire un UIBarButton
- Ora si inizia a ascrivere un po' di codice, ma veramente poco usando l'assistant teniamo premuto il tasto "ctrl" e clickiamo con il tasto sinistro del mouse sull'immageview trascinando il cursore del mouse fino al codice mostrato dall'assistant, creiamo così un IBOutlet
- facciamo in modo analogo con il barbutton creando però un IBAction "applyFilter"
- a questo punto inseriamo il seguente codice all'interno di applyFilter:

```swift
let inputImage = CIImage(image: photoImageView.image)
let randomColor = [kCIInputAngleKey: (Double(arc4random_uniform(314))/100)]
let filteredImage = inputImage.imageByApplyingFilter("CIHueAdjust", withInputParameters: randomColor)
let renderedImage = context.createCGImage(filteredImage, fromRect: filteredImage.extent())
photoImageView.image = UIImage(CGImage: renderedImage)
```

Lanciamo e vedremo l'app con la nostra foto il titolo sopra e il bottone sotto, premendo sul bottone applicheremo dei filtri colorati in maniera random.
