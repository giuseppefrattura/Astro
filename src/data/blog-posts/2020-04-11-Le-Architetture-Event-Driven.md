---
slug: le-architetture-event-driven
published: true
title: Le Architetture Event Driven
publishDate: 11 Apr 2020
description: Guida completa alle architetture event-driven e loro implementazioni
---

L'architectura Event driven (EDA) o orientata agli eventi è un paradigma architetturale che funziona rispondendo a degli eventi. In un'architettura Event-Driven lo stato del sistema cambia tramite eventi. Tipicamente è usato un bus di messaggi (una coda) per far partire un determinato evento. Sono presenti nell'architettura dei servizi che sono "in ascolto" sulla coda e quando è presente un nuovo messaggio lo "consumano".

## EVENTI

Gli eventi sono uno dei componenti fondamentali di questo tipo di architettura e possono essere:

- Atomico: un singolo evento
- Relazionato: una serie di eventi in relazione tra di loro, come ad esempio dati di monitoraggio
- Comportamentale: un insieme di eventi atomici

Gli eventi possono essere raggruppati in argomenti (topics) e possono essere divisi per essere eseguiti in parallelo.
Gli eventi sono consegnati nello stesso ordine con il quale sono stati ricevuti ma a differenza di una coda questi persistono.

In un sistema Event-Driven, l'acquisizione, la comunicazione, l'elaborazione e la persistenza degli eventi costituiscono i pilastri portanti della soluzione. Questa è la principale differenza rispetto a un modello request-driven.

L'architettura orientata agli eventi consente un **basso accoppiamento** delle applicazioni componenti, in sostanza al cambiare di una non devono necessariamente cambiare le altre,
risulta inoltre un ottimo approccio anche per le **architetture distribuite**. Il basso livello di accoppiamento è dovuto al fatto che l'applicazione che crea/genera un
evento (event producer) non sa a quale applicazione verrà destinato nè le conseguenze che derivano dal suo esito.

## Come funziona un'architettura guidata dagli eventi?

Gli attori dell'architettura guidata dagli eventi sono i **producer** ed i **consumer**.
Il producer genera un evento, può essere ad esempio la vendita di un oggetto su un ecommerce e lo rappresenta come messaggio.
Questo messaggio è trasmesso dal producer al/ai consumer tramite un canale di eventi.
I consumer sono "in ascolto" su questo canale e quando arriva un messaggio lo elaborano.

Un evento può essere ad esempio quando un utente inserisce un oggetto all'interno del proprio carrello in un e-commerce.
L'evento avrà un suo stato (id dell'oggetto, prezzo, ecc...) verrà inviato ad un consumatore che si occuperà di memorizzarlo e/o farci operazioni di BI.

## Modelli di architettura ad eventi

Un'architettura guidata dagli eventi può essere basata su un modello pub/sub o di flusso di eventi.

- **Modello pub/sub**  
Un'infrastruttura di messaggistica che si basa su sottoscrizioni a un flusso di eventi. Con questo modello, al suo verificarsi o in seguito alla sua pubblicazione, l'evento viene inviato ai sottoscrittori che devono essere informati.

- **Modello di flusso di eventi**  
Con un modello di flusso di eventi, gli eventi vengono annotati in un registro. I consumer non effettuano la sottoscrizione a un flusso di eventi, ma possono leggere ogni parte del flusso e partecipare in qualsiasi momento.

## I vantaggi di un'architettura Event Driven

Il vantaggio principale è nella separazione tra il produttore ed il consumatore dell'evento, in quanto nessuno dei due si riferisce mai direttamente all'altro.
C'è inoltre un elaborazione asincrona che insieme alla separazione logica (e volendo anche fisica) favorisce il parallelismo tramite architetture distribuite o microservizi.

## Message Processing vs Stream Processing

### Message Processing

Un componente crea un messaggio e lo invia ad una destinazione ben precisa, chi lo riceve è tipicamente in stato idle o di attesa. Tipicamente quando il messaggio arriva il consumatore effettua un solo processo e poi il messaggio/evento è cancellato.
Un esempio è la coda di messaggi, delle volte il ricevente una volta finito la sua elaborazione invia un altro evento ad un altra parte del sistema.
**ActiveMQ** e **RabbitMQ** sono i due framework più popolari per questo tipo di Architettura.

### Stream Processing

I componenti propagano eventi quando raggiungono un determinato stato. Gli altri componenti dell'architettura che sono interessati sono in attesa di questi
specifici eventi sullo stream di eventi. Gli eventi non sono inviati ad un determinato destinatario ma sono disponibili per tutti i componenti interessati.
Nello stream processing più componenti possono reagire a più eventi nello stesso momento e fare operazioni su più flussi ed eventi.
Con lo stream di eventi un sistema può riprodurre la cronologia di eventi, per esempio calcolare la media di utilizzo di una CPU al minuto da uno stream.
Il framework di questo tipo più conosciuto è senza dubbio Apache Kafka.

### Per approfondire:

- [https://en.wikipedia.org/wiki/Event-driven_architecture](https://en.wikipedia.org/wiki/Event-driven_architecture)
- [https://www.redhat.com/it/topics/integration/what-is-event-driven-architecture](https://www.redhat.com/it/topics/integration/what-is-event-driven-architecture)
- [https://aws.amazon.com/it/event-driven-architecture/](https://aws.amazon.com/it/event-driven-architecture/)
- [https://hackernoon.com/best-practices-for-event-driven-microservice-architecture-e034p21lk](https://hackernoon.com/best-practices-for-event-driven-microservice-architecture-e034p21lk)
- [https://pradeeploganathan.com/architecture/event-driven-architecture/](https://pradeeploganathan.com/architecture/event-driven-architecture/)
