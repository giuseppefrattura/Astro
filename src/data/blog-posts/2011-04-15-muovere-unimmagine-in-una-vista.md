---
slug: Muovere un'immagine in una vista
published: true
title: Muovere un'immagine in una vista
publishDate: 15 Apr 2011
description: Muovere un'immagine in una vista
---


Per muovere una generica immagine o volendo un qualsiasi contenuto nella vostra vista basta inserire nel file .m del progetto il codice seguente.
Dove imageView &egrave; l&rsquo;oggetto in questione da spostare e &ldquo;a&rdquo; &egrave; il nome della vista (view) alla quale l&rsquo;oggetto appartiene.

```ruby

- (void) touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event
UITouch *touch = [[event allTouches] anyObject];

CGPoint location = [touch locationInView:a];
if([touch view] == imageView) imageView.center = location; }
-(void)touchesMoved:(NSSet *)touches withEvent:(UIEvent *)event {
UITouch *touch = [[event allTouches] anyObject];
CGPoint location = [touch locationInView:a];
imageView.center = location;
if([touch view] == imageView) [self touchesBegan:touches withEvent:event];
}
```
