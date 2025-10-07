---
slug: foglio-stile-iphone
published: true
title: Preparare un foglio di stile separato per iPhone
publishDate: 19 May 2011
description: Come creare CSS specifici per la visualizzazione su iPhone
---

Quando si sviluppa un sito web è importante considerare la visualizzazione su dispositivi mobili. Vediamo come creare un foglio di stile specifico per iPhone.

<!--more-->

### Media Queries

Il codice base:
```css
@media only screen 
and (min-device-width: 320px) 
and (max-device-width: 480px) {
    /* Stili iPhone */
}
```

### Link al foglio di stile

Nel head HTML:
```html
<link rel="stylesheet" type="text/css" media="screen and (max-device-width: 480px)" href="iphone.css" />
```

### Viewport meta tag

Tag essenziale:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
```

### Ottimizzazioni base

Regole comuni:
- Font più grandi 
- Bottoni touch-friendly
- Layout a colonna singola
- Immagini responsive
- No hover states

### Touch targets

Dimensioni minime:
- Links: 44x44px
- Buttons: 44x44px
- Input fields: 44px height  
- Spacing: 8px minimo
- Tap areas chiare

### Performance

Ottimizzazioni:
1. Minify CSS
2. Sprite images  
3. Cache locale
4. Ridurre HTTP requests
5. CSS semplificato

### Testing

Come verificare:
- Safari iOS
- Chrome DevTools
- Simulatore iOS
- Device reali
- Browser stack

### Esempi pratici

```css
/* Base styles */
body {
    font-size: 16px;
    line-height: 1.4;
    padding: 10px;
}

/* Navigation */
nav {
    width: 100%;
    padding: 10px 0;
}

/* Images */
img {
    max-width: 100%;
    height: auto;
}
```

### Best Practices

Linee guida:
- Mobile first approach
- Test su dispositivi reali 
- Progressive enhancement
- Graceful degradation
- Performance first

### Conclusioni

Punti chiave:
1. Usa media queries
2. Ottimizza per touch
3. Testa accuratamente
4. Considera performance
5. Mantieni semplicità