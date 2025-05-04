---
slug: tips-tricks-come-rimuovere-xcode-da-mac-os-x
published: true
title: Come rimuovere Xcode da Mac OS X
publishDate: 19 Feb 2012
description: Guida per disinstallare completamente Xcode dal tuo Mac
---

Se per una ragione o per un'altra è necessario rimuovere Xcode da Mac OS X è meglio farlo in modo sicuro, evitando di lasciare file inutilizzati in memoria e senza che ci siano problemi di reinstallazione in un secondo momento.

<!--more-->

Per eliminare Xcode basta cercare l'applicazione "Terminale", in Spotlight oppure andare in Applicazioni->Utility->Terminale e da li eseguire la stringa:

```bash
sudo /Developer/Library/uninstall-devtools -mode=all
```

Una volta eseguito questo codice vi verrà chiesto di inserire la password da amministratore, dopo una breve attesa Xcode sarà rimosso.

Questa guida funziona sia per la versione 3 che per la 4 di Xcode, indipendentemente dal sistema operativo usato.
