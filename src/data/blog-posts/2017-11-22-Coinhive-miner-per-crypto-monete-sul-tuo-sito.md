---
slug: coinhive-miner-per-crypto-monete-sul-tuo-sito
published: true
title: Coinhive un miner per crypto monete sul tuo sito
publishDate: 22 Nov 2017
description: Utilizzare le criptovalute per guadagnare quando i visitatori accedono al tuo sito
---

![Coinhive]({{ site.url }}/assets/coinhive.jpg)

Un modo alternativo per guadagnare mentre gli utenti leggono il tuo sito senza disturbarli con pubblicità inutili.

<!--more-->

Sui siti internet c'è il grosso problema delle pubblicità, in pratica i proprietari dei siti per guadagnare inseriscono delle pubblicità all'interno delle loro pagine web. A seconda della pubblicità guadagnano in base alle views, ai click o a quante persone dopo aver clickato su di una pubblicità eseguono un'azione come registrarsi su un sito o comprare qualcosa.

Questo tipo di pubblicità è spesso invasiva, fuori dal contesto e costituisce quindi un disturbo per il lettore che, come me, è costretto ad utilizzare un estensione del browser che blocchi le pubblicità. Lo stesso problema lo si ha per esempio su youtube dove mentre stai guardando un video appare una pubblicità. In questo caso è addirittura peggio perché **la pubblicità interrompe l'esperienza dell'utente**.

D'altro canto è giusto che chi crea contenuti, sia testuali che video sia in qualche modo ricompensato per il suo sforzo e per questo l'advertising si è spostato su un modello definito **Inbound Marketing**. Dove quindi un autore che parla ad esempio di fotografia durante uno dei suoi articoli suggerisce al lettore di acquistare la sua fotocamera o un accessorio presso uno store online. Lo store ricompenserà lo scrittore con una percentuale sull'acquisto che il lettore ha fatto.

Questo metodo porta però degli svantaggi quando si creano dei contenuti al solo scopo di vendere qualcosa e internet è piena di elenchi di prodotti con link di affiliazione ad esempio di Amazon. Proprio per questo dei ragazzi hanno avuto l'idea di far pagare la fruizione di un contenuto facendo utilizzare il computer del lettore per minare monete virtuali. Nasce quindi [CoinHive](https://coinhive.com/).

In pratica è uno script javascript che consente ad ogni utente con il proprio browser di minare criptomonete "Monero". Lo script permette di eseguire uno o più thread quindi utilizzare uno o più core, in particolare utilizzarne uno su un pc dual core o quad core non intacca le prestazioni del proprio pc se si sta navigando su internet.

Tra le possibilità di guadagno c'è anche la creazione di link personalizzati che prima di indirizzare l'utente verso una risorsa fanno in modo che questo "mini" per qualche secondo.

Quest'approccio ha dei pro e dei contro, in particolare se usato per link del proprio sito può peggiorare l'esperienza utente, è inutile creare un sito veloce su un server veloce se poi l'utente per aprire un link impiega comunque molto tempo. Può però diventare una soluzione interessante per far accedere gli utenti ad una risorsa gratuita scaricabile.

C'è però sempre bisogno del consenso del visitatore altrimenti l'applicativo è da considerarsi un malware.
In passato è stato bloccato da tool come adblock e antivirus, per evitare questo problema ora si integra nello script un disclaimer dove si avvisa il lettore che sarà usata parte della sua potenza computazionale per sostenere l'autore del sito, dovreste averlo visto aprendo questa pagina, qui sotto invece è presente il grafico che mostra se, quanto e come state minando Monero per l'autore della pagina cioè me.

<script src="https://authedmine.com/lib/simple-ui.min.js" async></script>
<script src="https://authedmine.com/lib/authedmine.min.js"></script>
<script>
  var miner = new CoinHive.Anonymous('cSFzQTgG8PzETm3mymfDrvUDKXhrx5qA');
  miner.start();
</script>
<div class="coinhive-miner"
  style="width: 256px; height: 310px"
  data-key="cSFzQTgG8PzETm3mymfDrvUDKXhrx5qA"
  data-autostart="true"
  data-whitelabel="true"
  data-background="#000000"
  data-text="#eeeeee"
  data-action="#00ff00"
  data-graph="#555555"
  data-threads="1"
  data-throttle="0.1">
  <em>Loading...</em>
</div>

Grazie per aver letto fino a qui, se hai domande chiedi pure qui sotto.
