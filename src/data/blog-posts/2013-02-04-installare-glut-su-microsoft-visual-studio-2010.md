---
slug: installare-glut-su-microsoft-visual-studio-2010
published: true
title: Installare GLUT su Microsoft Visual Studio 2010
publishDate: 04 Feb 2013
description: Guida all'installazione della libreria GLUT per OpenGL in Visual Studio 2010
---

Per un progetto universitario mi è toccato installare windows per poter usare un progetto precedentemente creato con Visual Studio inerente alla Grafica Computazionale.

<!--more-->

In particolare il progetto ha come dipendenza GLUT, una libreria molto utilizzata con OpenGL. Visual Studio a differenza di Xcode non la contiene nativamente, bisogna quindi scaricarla da questo [link](http://www.opengl.org/resources/libraries/glut/glut_downloads.php).

Tra i vari files ce ne sono tre che ci interessano:

- *glut.h* che va copiato ed incollato in 'C:\Programmi\Microsoft Visual Studio 10.0\VC\include\GL\'
- *glut32.lib* in 'C:\Programmi\Microsoft Visual Studio 10.0\VC\lib\'
- *glut32.dll* in 'C:\Windows\System32\'

Fatto questo sarà possibile senza errori includere GLUT all'interno del proprio progetto tramite il comando:

```cpp
#include <GL/glut.h>
```
