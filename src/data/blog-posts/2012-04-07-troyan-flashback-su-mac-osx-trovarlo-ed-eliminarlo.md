---
slug: troyan-flashback-su-mac-osx-trovarlo-ed-eliminarlo
published: true
title: Troyan FlashBack su Mac OsX Trovarlo ed eliminarlo
publishDate: 07 Apr 2012 
description: Come identificare e rimuovere il malware FlashBack su macOS
---

Pare che negli ultimi mesi un Troyan di nome FlashBack sia riuscito ad infettare circa 600mila Mac tra portatili e fissi. Gli utenti Apple non sono mai stati propensi all'utilizzo di antivirus perché non c'è né mai stato un grande bisogno, eppure con l'aumento di vendite dei Mac stanno nascendo sempre più malware per questo tipo di computer.

![Come proteggersi dalle nuove insidie del cavallo di troia su mac](/assets/come-proteggersi-dalle-nuove-insidie-del-cavallo-di-troia-su-mac-flashback-malware.jpg)

Il Troyan in questione sfrutta un bug nella macchina virtuale di Java per entrare nel sistema, una sua versione precedente usava un aggiornamento di Flash, un applicativo grafico molto usato, soprattutto dagli amanti della mela.

Per verificare se si è stati infettati si può aprire il terminale di Mac OsX, Applicazioni->Utility->Terminale, indipendentemente dalla versione, Leopard, Snow Leopard o Lion ed eseguire il seguente comando:

```bash
ls /Users/Shared/.*.so
```

Se vedrete il risultato "No such file or directory", vuol dire che non siete stati infettati, nel caso in cui vediate un elenco di files che finiscono per ".so" vuol dire che siete stati infettati.

Se siete stati infettati nessuna paura, i metodi per liberarsi del Troyan sono essenzialmente due.

![Apple cura i malware](/assets/apple-cura-i-malware.jpg)

### Metodo semplice

Scaricate un antivirus per Mac per effettuarne la rimozione, uno di quelli consigliato è [Intego](http://www.intego.com/) oppure [F-Secure](http://www.f-secure.com/it/web/home_it/protection/anti-virus-for-mac/overview).

### Metodo Complicato

1. Aprire il terminale e digitare "defaults read /Applications/Safari.app/Contents/Info LSEnvironment"
2. Prendere nota dei codici DYLD_INSERT_LIBRARIES e premere nuovamente invio
3. Se si riceve un messaggio d'errore simile a "The domain/default pair of (/Applications/Safari.app/Contents/Info, LSEnvironment) does not exist" non si è infetti.
4. Se i file vengono effettivamente trovati, digitare "grep -a -o '__ldpath__[ -~]*' %percorso_del_punto_2% " e prendere nota del valore di fianco a "__ldpath__"
5. Eseguire i comandi "sudo defaults delete /Applications/Safari.app/Contents/Info LSEnvironment" e "sudo chmod 644 /Applications/Safari.app/Contents/Info.plist", cancellando poi i file trovati nel secondo punto e nel quarto.
6. Eseguire il comando "defaults read ~/.MacOSX/environment DYLD_INSERT_LIBRARIES" e, se si riceve un messaggio come "The domain/default pair of (/Users/joe/.MacOSX/environment, DYLD_INSERT_LIBRARIES) does not exist" il trojan è stato correttamente rimosso. In caso contrario, eseguire nuovamente "grep -a -o '__ldpath__[ -~]*' %percorso_del_punto 4% ", prendendo nota dei valori.
7. Dopo aver eseguito "defaults delete ~/.MacOSX/environment DYLD_INSERT_LIBRARIES launchctl unsetenv DYLD_INSERT_LIBRARIES", cancellare i file indicati nei punti precedenti.

Fonte: [La Repubblica](http://www.repubblica.it/tecnologia/2012/04/05/news/un_worm_infetta_600mila_mac_ecco_come_rimuovere_il_virus-32811422/)

Il primo metodo è semplice ma ha un costo di circa 40€ che garantisce però l'utilizzo di un antivirus per un anno, e quindi potrebbe difendervi da altri malware, il secondo metodo è sicuramente più complesso, ma vi consente senza spese di curare il vostro Mac.

La Apple ha già provveduto a rilasciare ben due aggiornamenti per la macchina virtuale Java, a chi non è stato ancora colpito dal malware conviene effettuare tutti gli aggiornamenti, per gli utenti già infettati sono inutili, dovranno prima rimuovere il malware dal proprio mac e poi aggiornare.

### Curiosità

Che significa ls /Users/Shared/.*.so ?

Si è scoperto che FlashBack crea dei file all'interno della cartella /Users/Shared/ che finiscono con ".so". Per cercare quindi la presenza di files di questo tipo usiamo il comando **ls** che serve ad elencare l'elenco dei files all'interno di una cartella, in questo caso /Users/Shared/ e poi usiamo le **espressioni regolari**. L'espressione regolare che usiamo in questo caso è composta da due parti ".*" e ".so".

".*" identifica un insieme di caratteri, qualsiasi carattere indipendentemente dalle volte in cui si presenta.

".so" invece denota che il nome del file finisce con '.so'.
