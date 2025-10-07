---
slug: iphone-sdk-controllare-se-un-file-esiste
published: true
title: iPhone SDK - Controllare se un file esiste
publishDate: 22 Jun 2012
description: Come verificare l'esistenza di un file in iOS SDK
---

Prima di provare a scrivere un file su iPhone è meglio verificare la sua esistenza, per farlo si può usare questa funzione:

```objective-c
BOOL fileExists = [[NSFileManager defaultManager] fileExistsAtPath:imagePath];
```
