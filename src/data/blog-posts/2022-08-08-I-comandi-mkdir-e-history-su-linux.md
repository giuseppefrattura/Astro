---
slug: i-comandi-mkdir-e-history-su-linux
published: true
title: I comandi mkdir e history su Linux
publishDate: 08 Aug 2022
description: Guida ai comandi Linux mkdir e history per gestire directory e cronologia
---

![Tux la mascotte di Linux](/assets/tux.png)

*Image by [Boby Pogy](https://pixabay.com/users/lukrate-607309/) from [Pixabay](https://pixabay.com)*

In questo breve articolo vorrei parlare di due comandi che personalmente uso molto spesso quando mi collego a macchine linux.

## mkdir

mkdir serve a creare cartelle all'interno del file system linux, ha tre opzioni:

- `-p` - per creare più directory innestate
- `-v` - mostra a video le informazioni sulle cartelle create
- `-m` - da la possibilità di settare al momento della creazione i permessi della directory

Esempi di utilizzo:

- `mkdir {hello,world}` creerà due cartelle
- `mkdir -p master/parent/project` creerà cartelle una dentro l'altra
- `mkdir -m777 master` creerà e darà i permessi 777 alla cartella master
- `mkdir -p -v -m777 master/parent/project` i due comandi precedenti contemporaneamente ed in modalità *verbose*

## history

history permette di avere l'elenco degli ultimi comandi utilizzati su terminale.

- `history [numero]` permette di avere gli ultimi [numero] comandi eseguiti
- `history -d [numero]` cancella gli ultimi [numero] comandi
- `history -c` pulisce tutta la history
- `history -w [nomefile]` scrive la history su un file