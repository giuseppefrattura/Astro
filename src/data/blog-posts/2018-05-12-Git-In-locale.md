---
slug: git-in-locale
published: true
title: Git in locale
publishDate: 12 May 2018
description: Come utilizzare Git in locale per gestire i propri progetti
---

In questo articolo vorrei spiegare come utilizzare Git in locale, senza dover necessariamente utilizzare servizi come GitHub o BitBucket.

<!--more-->

### Cos'è Git

Git è un sistema di controllo versione distribuito, creato da Linus Torvalds nel 2005. Permette di tenere traccia delle modifiche fatte ai file nel tempo e di collaborare con altri sviluppatori.

### Installazione

Su macOS, Git può essere installato in diversi modi:
1. Tramite Xcode Command Line Tools
2. Tramite Homebrew
3. Scaricando l'installer dal sito ufficiale

### Configurazione iniziale

Prima di utilizzare Git è necessario configurarlo:

```bash
git config --global user.name "Il tuo nome"
git config --global user.email "la-tua@email.com"
```

### Creare un repository

Per creare un nuovo repository:

```bash
mkdir mio-progetto
cd mio-progetto
git init
```

### I tre stati di Git

In Git, i file possono essere in tre stati:
1. Working directory (modificati)
2. Staging area (pronti per il commit)
3. Repository (salvati nella storia)

### Comandi base

- `git status`: mostra lo stato dei file
- `git add`: aggiunge file alla staging area
- `git commit`: salva le modifiche nel repository
- `git log`: mostra la storia dei commit

### Branch

I branch permettono di lavorare su diverse versioni del progetto:

```bash
git branch nome-branch    # crea un branch
git checkout nome-branch  # passa al branch
git merge nome-branch     # unisce il branch
```

### Ignorare file

Il file `.gitignore` permette di specificare quali file non devono essere tracciati:

```
*.log
node_modules/
.DS_Store
```

### Backup

Per fare un backup del repository:

```bash
git clone --mirror /path/to/repo /path/to/backup
```

### Pro dell'uso locale

- Velocità
- Privacy
- Controllo totale
- Nessuna dipendenza da servizi esterni
- Ideale per progetti personali

### Contro dell'uso locale

- Nessun backup automatico
- Difficile collaborare
- Nessuna interfaccia web
- Gestione manuale dei backup
- Limitazioni per progetti grandi

### Buone pratiche

1. Commit frequenti e piccoli
2. Messaggi di commit chiari
3. Un branch per feature
4. Backup regolari
5. Documentazione aggiornata

### Conclusioni

Git in locale è un ottimo strumento per gestire i propri progetti, soprattutto quelli personali o privati. È importante però fare backup regolari e mantenere una buona organizzazione del repository.