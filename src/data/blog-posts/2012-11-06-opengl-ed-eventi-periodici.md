---
slug: opengl-ed-eventi-periodici
published: true
title: OpenGL ed eventi periodici
publishDate: 06 Nov 2012
description: Guida all'utilizzo della funzione timerFunc della libreria GLUT in OpenGL
---

Continua la serie di guide sulla programmazione OpenGL, oggi voglio parlarti della funzione timerFunc della libreria Glut. Questa funzione permette di eseguire una funzione in modo periodico, il suo funzionamento non è però banale.

<!--more-->

Creiamo prima il main della funzione:

```c
int main(int argc, char** argv) {
  glutInit(&argc, argv);
  glutInitDisplayMode(GLUT_RGB);
  glutInitWindowPosition(300, 300);
  glutInitWindowSize(500, 500);
  glutCreateWindow("GiuseppeFrattura.it");
  glClearColor(0.0, 0.0, 0.0, 1.0);
  glutDisplayFunc( redraw );
  glutTimerFunc(1000, funzionePeriodica, 0);
  glutMainLoop();
}
```

**glutTimerFunc** prende in input un numero che rappresenta i millisecond da aspettare prima di lanc la funzionePeriodica, il suo secondo parametro, e come terzo parametro in intero da passare a quest'ultima. Scritto così il programma eseguirà solo una volta il codice all'interno della "funzionePeriodica", per eseguire il codice della funzione in maniera periodica è necessario reinserire la chiamata alla funzione "glutTimerFunc(1000, funzionePeriodica, 0)" all'interno di funzionePeriodica.

Ecco un esempio di come ho usato una funzione perdiodica:

```c
void funzionePeriodica(int x){
  conta++;
  alpha=alpha-30;
  if (conta>12) {
    beta=beta-30;
    conta=1;
  }
  glutPostRedisplay();
  glutTimerFunc(1000, funzionePeriodica, 0);
}
```

La funzione "glutPostRedisplay()" serve ad aggiornare quanto mostrato sullo schermo, nel mio caso cambio l'angolo di rotazione di una linea creata nella funzione redraw.
