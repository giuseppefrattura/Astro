---
slug: iphone-sdk-come-abilitare-il-tasto-return-nellinserimento-dei-dati-da-tastierino
published: true
title: iPhone SDK - Come abilitare il tasto return nell'inserimento dei dati da tastierino
publishDate: 20 Jun 2012
description: Implementare la funzione di chiusura tastiera in iOS con UITextField
---

Quando si usano Text Field con Xcode è automatica l'apparizione del tastierino numerico nella parte bassa della stessa, purtroppo non è automatica la sua scomparsa. Mi sono trovato recentemente con questa problematica ed ora spiegherò come abilitare il tasto return nell'inserimento dei dati da tastierino.

All'interno del file ViewController.h modifichiamo la definizione di interface aggiungendo `<UITextFieldDelegate>` come segue:

```objective-c
@interface YourViewController : UIViewController <UITextFieldDelegate>
```

Ora nel rispettivo file .m dobbiamo aggiungere il metodo:

```objective-c
- (BOOL)textFieldShouldReturn:(UITextField *)textField
{
    [textField resignFirstResponder];
    return YES;
}
```

Poi nel metodo viewDidLoad aggiungiamo la seguente riga, impostando il delegato di ogni Text Field al quale vuoi abilitare la funzionalità della chiusura della tastiera:

```objective-c
yourTextField.delegate = self;
```

Per approfondimenti visita [Stack Overflow](http://stackoverflow.com/questions/6190276/how-to-make-return-key-on-iphone-make-keyboard-disappear)
