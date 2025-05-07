---
slug: impostare-sfondo-app-iphone
published: true
title: Impostare un'immagine come sfondo di un'applicazione iPhone
publishDate: 15 Apr 2011
description: Come aggiungere uno sfondo personalizzato a un'app iOS
---

In questo articolo vedremo come impostare un'immagine come sfondo in un'applicazione iPhone.

<!--more-->

### Setup base

Nel View Controller:
```objective-c
UIImageView *backgroundView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"background.png"]];
backgroundView.frame = self.view.frame;
[self.view addSubview:backgroundView];
[self.view sendSubviewToBack:backgroundView];
```

### Dimensioni immagine

Risoluzioni consigliate:
- iPhone 4/4s: 960x640px
- iPhone 5/5s: 1136x640px
- iPhone 6: 1334x750px
- iPhone 6+: 1920x1080px
- iPad: 2048x1536px

### Gestione memoria

Best practices:
1. Usa @2x e @3x
2. Ottimizza PNG
3. Cache immagini
4. Rilascia memoria
5. Gestisci rotazione

### Auto Layout

Configurazione constraints:
```objective-c
backgroundView.translatesAutoresizingMaskIntoConstraints = NO;
[backgroundView.topAnchor constraintEqualToAnchor:self.view.topAnchor].active = YES;
[backgroundView.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor].active = YES;
[backgroundView.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor].active = YES;
[backgroundView.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor].active = YES;
```

### Content Mode

Opzioni disponibili:
- ScaleToFill
- AspectFit
- AspectFill
- Center
- Top/Bottom/Left/Right

### Performance

Ottimizzazioni:
- Compressione PNG
- Dimensioni appropriate
- Caching system
- Hardware acceleration
- Background thread

### Alternative

Altri approcci:
1. CALayer background
2. View backgroundColor
3. Pattern images
4. Gradient layer
5. Blur effects

### Testing

Verificare su:
- Diversi dispositivi
- Orientamenti
- Condizioni low memory
- Background/Foreground
- State preservation

### Best Practices

Consigli utili:
- Usa asset catalog
- Ottimizza immagini
- Gestisci memoria
- Supporta tutti i device
- Testa performance

### Conclusioni

Punti chiave:
1. Dimensioni corrette
2. Ottimizzazione
3. Auto Layout
4. Memory management
5. Testing accurato