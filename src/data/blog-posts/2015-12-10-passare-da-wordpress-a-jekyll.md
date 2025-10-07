---
slug: passare-da-wordpress-a-jekyll
published: true
title: Passare da Wordpress a Jekyll
publishDate: 10 Dec 2015
description: Come migrare il proprio blog da Wordpress a Jekyll per ottenere migliori performance
---

Wordpress è una delle piatteforme di blogging più utilizzate al mondo, un blog su tre è creato con questo CMS. Eppure ha varie pecche, una su tutte la lentezza. Se invece si è in cerca di velocità esistono una serie di CMS che generano pagine HTML statiche.

<!--more-->

I vantaggi di usare wordpress sono tanti, in primis è molto facile da usare, ha dei requisiti per l'hosting bassi e consente di creare un sito in pochi minuti. è inoltre molto facile creare plugin e temi per wordpress, questo ha portato alla creazione di store virtuali dove è possibile comprare questi componenti a prezzi irrisori ed avere quindi un sito professionale senza scrivere codice, o quasi.

Wordpress è costruito in php, utilizza un database di tipo MySQL per memorizzare il contenuto degli articoli ed i settaggi del sito. Ha una parte amministrativa grazie alla quale è possibile gestire il sito da qualsiasi postazione o anche da app per sistemi mobile. Questo porta anche però a problemi di sicurezza: **cosa succede se qualcuno entra nella parte amministrativa del mio sito?**

Per quanto con [la versione 7 php](http://thenextweb.com/dd/2015/12/10/php-7-is-now-available-and-its-the-biggest-update-in-years/) risulta molto più performante, il server ad ogni visita per poter esporre una pagina HTML deve interpretare il codice wordpress e quello dei vari template e plugin, all'interno del codice php ci sono poi spesso interrogazioni al database per ottenere ad esempio il contenuto di un articolo. Questo porta ad una latenza nella risposta a volte elevata, questi problemi sono in parte aggirabili tramite componenti che effettuano il caching delle risorse utilizzate più spesso.

### Cos'è Jekyll

[Jekyll](http://jekyllrb.com/) è un generatore di siti statici, in pratica un sito creato con Jekyll non ha bisogno di un database per funzionare, Jekyll si occupa di creare la struttura HTML, CSS e Javascpript necessaria per il funzionamento del sito. Tutti gli articoli e le pagine sono sul proprio computer, quando si voule creare o aggiornare il sito si esegue "jekyll serve" da riga di comando e il sito sarà generato all'interno della directory "_site". Tutto il contenuto di questa cartella va poi caricato sul server che ospiterà il sito.

### La sicurezza in Jekyll

Un sito costruito in Jekyll non ha una parte amministrativa web questo comporta maggiore sicurezza rispetto wordpress, però per aggiornare un contenuto del sito è necessario usare un computer con Jekyll installato.

### Come e dove si instala Jekyll

Jekyll è un applicazione creata con Ruby, necessiterà quindi avere Ruby installato e funzionante sulla propria macchina. Si sceglie dove installare il nuovo sito e all'interno di quella directory si esegue il comando shell "Jekyll new nomesito". Per vedere il sito sempre da terminale scrivere "jekyll serve" e verrà lanciato un server web locale con indirizzo standard 127.0.0.1:4000. Lasciando il terminale aperto ogni singola modifica verrà riportata sul sito. Per creare un articolo basta creare un nuovo file all'interno della cartella "_post", le pagine invece possono essere inserite liberamente nella directory principale del sito.

### Il deploy del sito

Quando crediamo che il sito sia pronto basta eseguire il comando "Jekyll build" e il sito verrà creato staticamente all'interno della directory "_site".

### I plugin ed i template per jekyll

Anche per jekyll esistono una serie di plugin e template grafici per modificarne il comportamento, sono sicuramente molti di meno rispetto quelli disponibili per Wordpress anche vista la giovinezza del progetto Jekyll.

### I vantaggi di jekyll rispetto wordpress

Jekyll è più sicuro e le prestazioni di un sito sono maggiori in termini di tempi di risposta

### Gli svantaggi di jekyll rispetto wordpress

Necessita una minima conoscenza della programmazione HTML, non ha molti componenti come wordpress, è usato da pochi (è un progetto giovane).

### Il SEO in Jekyll

Uno dei plugin più utilizzati in wordpress è quello relativo al SEO (Search Engine Optimization), in pratic utilizzare questo componente rende il tuo sito e i tuoi articoli più appetibili per i motori di ricerca che quindi tenderà a metterli più in alto nei risultati. Jekyll al momento non dispone di un plugin del genere ma ci sono due riflessioni da fare a riguardo:

- è possibile creare una struttura html ottimizzata anche con Jekyll ma questo comporta un piccolo lavoro di modifica del tema standard
- il punto forte di Jekyll è la velocità del sito, quest'ultima è però un fattore di ranking per i motori di ricerca. Non è quindi detto che un sito wordpress ottimizzato lato SEO risulti posizionato meglio di uno Jekyll.
