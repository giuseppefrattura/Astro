---
slug: come-programmare-opengl-con-c-su-mac-osx
published: true
title: Come programmare OpenGL con C su Mac OsX
publishDate: 17 Oct 2012
description: Guida per configurare un progetto OpenGL con C su Mac OSX
---

Per provare del codice OpenGL su mac è possibile utilizzare Xcode, la potentissima IDE creata dalla Apple. Per farlo i passi sono pochi e semplici.

<!--more-->

Creare un nuovo progetto Xcode e creiamo un applicazione di tipo command line tool scegliendo come linguaggio di programmazione 'c'.

![Creazione progetto Xcode]({{ site.url }}/assets/CommandLineTool.jpg)
*Crea un applicazione per Mac OsX di tipo command line tool*

Nelle impostazioni del progetto andiamo su Build Phases -> Link Binary With Libraries ed aggiungiamo "openGL.framework" e "GLUT.framework".

![Librerie caricate]({{ site.url }}/assets/OpenFramework.jpg)
*Pagina di caricamento delle librerie*

A questo punto basterà importare all'inizio del codice del main le librerie desiderate:

```c
#include "GLUT/glut.h"
#include "OPENGL/opengl.h"
```

ed il gioco è fatto!
