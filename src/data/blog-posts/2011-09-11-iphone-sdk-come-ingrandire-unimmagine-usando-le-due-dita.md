---
slug: iphone-sdk-come-ingrandire-unimmagine-usando-le-due-dita
published: true
title: iPhone SDK Come ingrandire un'immagine usando le due dita
publishDate: 11 set 2011
description: Come implementare lo zoom su immagini con due dita in iPhone SDK.
---

In un applicativo per dispositivi mobili ci si trova spesso ad operare con immagini con risoluzione maggiore di quella degli stessi dispositivi, è quindi buona norma lasciare all'utente la possibilità di "zoommare" all'interno di una foto.

Ecco come si fa per l'iPhone SDK:

Per prima cosa creiamo un nuovo progetto, una View-Based Application e chiamiamola FotoEsempio.

![View Based Application](/assets/CreaProgetto.png)
![Nome Del progetto](/assets/NomeProgetto.png)

Apriamo il file `FotoEsempioViewController.xib`, all'inizio questo file contiene solo la View.
Sulla destra troviamo la libreria degli oggetti inseribili all'interno di un applicativo iPhone, scegliamo la Scroll View, ed inseriamola al di fuori della vista, poi cancelliamo la vista in modo che rimanga solo la scroll view.

![File .xib originale](/assets/XibOriginale.png)
![File .xib modificato](/assets/XibModificato.png)

Clickiamo col tasto destro su File's Owner ed associamo all'attributo "view" la Scroll View che abbiamo appena inserito.

![Impostiamo la View](/assets/ImpostaView.png)
![Impostiamo la View 2](/assets/ImpostaView2.png)

Clicchiamo poi sempre col destro sulla scroll view e selezioniamo come delegato File's Owner.

![Settiamo il delegato](/assets/Delegato.png)

Nel file `FotoEsempioViewController.h` inseriamo:

```objective-c
@interface FotoEsempioViewController : UIViewController {
    UIImageView *imageView;
}

@property(nonatomic,retain) UIImageView *imageView;
```

Nel file `FotoEsempioViewController.m` aggiungiamo:

```objective-c
@synthesize imageView;

- (void)dealloc {
    [imageView release];
    [super dealloc];
}
```

Nella procedura `viewDidLoad` inserire le righe:

```objective-c
- (void)viewDidLoad {
    UIImage *image = [UIImage imageNamed:@"FotoEsempio.jpg"];
    imageView = [[UIImageView alloc] initWithImage:image];
    [self.view addSubview:imageView];
    [(UIScrollView *)self.view setContentSize:[image size]];
    [(UIScrollView *)self.view setMaximumZoomScale:20.0];
    [(UIScrollView *)self.view setMinimumZoomScale:-20.0];
    [super viewDidLoad];
}
```

Ed aggiungiamo la procedura:

```objective-c
- (UIView *)viewForZoomingInScrollView:(UIScrollView *)scrollView {
    return imageView;
}
```

Aggiungiamo al progetto la nostra immagine `FotoEsempio.jpg`.

![Inserimento dell'immagine](/assets/CopyFile.png)

Lanciamo il tutto, vedremo che anche da simulatore possiamo testare il tocco di due dita tramite la pressione del tasto "alt".

![Anteprima progetto](/assets/Preview.png)
