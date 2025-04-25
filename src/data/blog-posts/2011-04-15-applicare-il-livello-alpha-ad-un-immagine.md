---
slug: Applicare il livello alpha ad un immagine
published: true
title: Applicare il livello alpha ad un immagine
publishDate: 15 Apr 2011
description: Every blog starts with a single post. This is yours. Make it great.
---

Per un applicazione per dispositivi iOS ho dovuto effettuare dei piccolissimi ritocchi a delle foto su dispositivo. In questo breev post descrivo il procedimento per la modifica di un'immagine applicando un livello di trasparenza detto livello alpha.

<!--more-->
Ecco il codice del metodo da usare :

```ruby
-(CGImageRef) CopyImageAndAddAlphaChannel: (GImageRef)sourceImage {
CGImageRef retVal = NULL;
size_t width = CGImageGetWidth(sourceImage);
size_t height = CGImageGetHeight(sourceImage);
CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
CGContextRef offscreenContext = CGBitmapContextCreate(NULL, width, height,
8, 0, colorSpace, kCGImageAlphaPremultipliedFirst);
if (offscreenContext != NULL) {
CGContextDrawImage(offscreenContext, CGRectMake(0, 0, width, height), sourceImage);
retVal = CGBitmapContextCreateImage(offscreenContext);
CGContextRelease(offscreenContext);
}

CGColorSpaceRelease(colorSpace);
return retVal;
}
```

La funzione per la modifica dell&rsquo;immagine diventa cos&igrave; :

```ruby
- (UIImage*)maskImage:(UIImage *)image withMask:(UIImage *)maskImage {
CGImageRef maskRef = maskImage.CGImage;
CGImageRef mask = CGImageMaskCreate(CGImageGetWidth(maskRef),
CGImageGetHeight(maskRef),
CGImageGetBitsPerComponent(maskRef),
CGImageGetBitsPerPixel(maskRef),
CGImageGetBytesPerRow(maskRef),
CGImageGetDataProvider(maskRef), NULL, false);
CGImageRef sourceImage = [image CGImage];
CGImageRef imageWithAlpha = sourceImage;
&#47;&#47;add alpha channel for images that don&rsquo;t have one (ie GIF, JPEG, etc&hellip;)
&#47;&#47;this however has a computational cost
if ((CGImageGetAlphaInfo(sourceImage) == kCGImageAlphaNone) || (CGImageGetAlphaInfo(sourceImage) == kCGImageAlphaNoneSkipFirst))
{imageWithAlpha =[self CopyImageAndAddAlphaChannel:(CGImageRef)sourceImage];
}

CGImageRef masked = CGImageCreateWithMask(imageWithAlpha, mask);
CGImageRelease(mask);
&#47;&#47;release imageWithAlpha if it was created by CopyImageAndAddAlphaChannel
if (sourceImage != imageWithAlpha) {
CGImageRelease(imageWithAlpha);
}
UIImage* retImage = [UIImage imageWithCGImage:masked];
CGImageRelease(masked);
return retImage;
}
```

Fonti :<br />
1.	<a href="http://iphonedevelopertips.com/cocoa/how-to-mask-an-image.html">http:/iphonedevelopertips.com/cocoa/how-to-mask-an-image.html</a><br />
2.	<a href="http://pastie.org/418627">http://pastie.org/418627</a>

