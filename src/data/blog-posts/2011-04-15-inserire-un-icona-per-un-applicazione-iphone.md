---
slug: inserire-icona-app-iphone
published: true
title: Inserire un'icona per un'applicazione iPhone
publishDate: 15 Apr 2011
description: Come aggiungere e configurare l'icona di un'app iOS
---

L'icona è uno degli elementi più importanti di un'applicazione iOS. Vediamo come inserirla e configurarla correttamente.

<!--more-->

### Dimensioni richieste

Formati necessari:
- 180x180px (iPhone 6+ e superiori)
- 120x120px (iPhone 4+ Retina)
- 87x87px (Apple Watch)
- 80x80px (Spotlight)
- 58x58px (Settings)

### Asset Catalog

Configurazione in Xcode:
1. Apri Assets.xcassets
2. Seleziona AppIcon
3. Trascina le icone
4. Verifica dimensioni
5. Build progetto

### Design guidelines

Linee guida Apple:
- Design semplice
- Riconoscibile
- No trasparenza
- No bordi
- Palette limitata

### Formato file

Specifiche tecniche:
- PNG format
- RGB colorspace
- No alpha channel
- No interlacing
- Compressione ottimale

### Info.plist

Configurazione file:
```xml
<key>CFBundleIconFiles</key>
<array>
    <string>Icon.png</string>
    <string>Icon@2x.png</string>
</array>
```

### Best practices

Consigli utili:
1. Testa su device
2. Verifica tutti i formati
3. Ottimizza immagini
4. Mantieni consistenza
5. Segui guidelines

### Problemi comuni

Da evitare:
- Dimensioni errate
- Trasparenze
- File troppo pesanti
- Design complesso
- Bordi bianchi

### Testing

Verificare su:
- Home screen
- Settings
- Spotlight
- App Store
- Notifiche

### Conclusioni

Punti importanti:
- Rispetta dimensioni
- Segui guidelines
- Testa accuratamente
- Ottimizza files
- Mantieni semplicità