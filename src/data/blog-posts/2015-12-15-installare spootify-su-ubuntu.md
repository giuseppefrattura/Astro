---
slug: installare-spotify-su-ubuntu
published: true
title: Come installare Spotify su Ubuntu Linux
publishDate: 18 Dic 2015
description: Guida passo passo per installare Spotify su sistemi Ubuntu Linux
---

Spotify è l'applicazione di streaming musicale più utilizzata al mondo. Eccoti una semplice guida per installarlo anche se utilizzi Linux.

<!--more-->

### Cos'è un repository di applicazioni Linux

Un repository è un indirizzo web con un insieme di collegamenti ad applicazioni create appositamente per una distribuzione Linux. Nel nostro caso per installare Spotify su Ubuntu è necessario aggiungere il repository ufficiale, aggiornare l'elenco della applicazioni e eseguire il comando di installazione.

Per prima cosa su Ubuntu apri il terminale con l'App Launcher o con la pressione dei tasti Ctrl+Alt+T.

Aggiungi il repository di Spotify con il comando:

```bash
echo deb http://repository.spotify.com stable non-free | sudo tee /etc/apt/sources.list.d/spotify.list
```

Di questo codice notiamo due parti:
1. non-free vuol dire che Spotify non è distribuito con licenza free software, si tratta infatti di software proprietario
2. sudo è un comando che permette all'utente di eseguire comandi che solo l'amministratore può eseguire, per questo dopo aver inserito questo codice è richiesta la password di amministrazione

Eseguire il comando:

```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys D2C19886
```

in modo da poter verificare l'integrità dei pacchetti scaricati.

Ora bisogna aggiornare l'elenco delle applicazioni installabili eseguendo il comando:

```bash
sudo apt-get update
```

e poi installare Spotify:

```bash
sudo apt-get install spotify-client
```

È possibile che ci siano dei problemi per una libreria mancante, per versioni di Ubuntu successive alla 14.04, in questo caso per risolvere il problema basta scaricare e installare con il software center la libreria libgcrypt11 dai link appena sotto.

- [libgcrypt11 per sistemi a 64-bit](https://launchpad.net/ubuntu/+archive/primary/+files/libgcrypt11_1.5.3-2ubuntu4.2_amd64.deb)
- [libgcrypt11 per sistemi a 32-bit](https://launchpad.net/ubuntu/+archive/primary/+files/libgcrypt11_1.5.3-2ubuntu4.2_i386.deb)
