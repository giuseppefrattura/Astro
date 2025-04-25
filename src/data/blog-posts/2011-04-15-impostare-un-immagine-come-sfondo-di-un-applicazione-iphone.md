---
slug: Impostare un immagine come sfondo di un applicazione iPhone
published: true
title: Impostare un immagine come sfondo di un applicazione iPhone
publishDate: 15 Apr 2011
description: Impostare un immagine come sfondo di un applicazione iPhone
---
<p>
In questo post vedremo come impostare un'immagine come sfondo all'interno di una view della nostra applicazione iOS.<br/>
Tutto molto semplice, basta inserire il seguente codice nel viewDidLoad</p>
<!--more-->

```ruby
self.view.backgroundColor = [[UIColor alloc] initWithPatternImage:[UIImage imageNamed:@"nomeImmagine.jpg"]];
```

<p>I formati supportati sono parecchi, ricordate di inserire l&rsquo;immagine all&rsquo;interno del progetto Xcode.</p>
