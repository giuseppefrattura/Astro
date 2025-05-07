---
slug: leggere-un-file-in-python-riga-per-riga
published: true
title: Leggere un file in Python riga per riga
publishDate: 06 Jun 2012
description: Come leggere e processare file di testo in Python in modo efficiente
---

Python è un linguaggio di scripting, è quindi molto usato per modificare file di testo con contenuti ripetitivi o ai quali bisogna applicare delle modifiche in maniera ripetitiva.

Ci sono tre modi per leggere un file in Python riga per riga:

### Leggere tutto in una volta:

```python
f = open('myfile.txt')
lines = f.readlines()
f.close()
for line in lines:
    print line,
```

Leggere tutto in una volta l'elaborazione è più veloce ma può risultare molto esoso in termini di memoria se il file è grande.

### Leggere una riga alla volta con un ciclo:

```python
f = open('myfile.txt')
line = f.readline()
while line:
   print line,
   line = f.readline()
f.close()
```

In questo modo si leggerà effettivamente una sola riga alla volta.

### Leggere una riga alla volta con un iteratore:

```python
f = open('myfile.txt')
for line in iter(f):
   print line,
f.close()
```
