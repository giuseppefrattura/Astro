---
slug: la-tracciabilita-dei-requisiti
published: true
title: La tracciabilità dei requisiti
publishDate: 15 Nov 2014
description: Una breve guida alla tracciabilità dei requisiti nell'Ingegneria del Software
---

La tracciabilità dei requisiti è uno degli ambiti di ricerca più interessanti dell'Ingegneria del Software, essa consiste nella creazione di "tracce" tra artefatti software in modo da segnalarne le dipendenze. Per artefatti si intendono i requisiti di sistema, l'architettura (ad es. UML), il codice sorgente ed i test case.

<!--more-->

Premesso che sulla tracciabilità dei requisiti sono stati scritti svariati libri e soprattutto molte pubblicazioni, in questo articolo descrivo brevemente in cosa consiste, quali sono i suoi benefici, i suoi svantaggi e i suoi utilizzi principali. La tracciabilità dei requisiti è utilizzata principalmente nel **riutilizzo del codice** e nella **Change Impact Analysis**.

Il riutilizzo del codice può essere molto utile quando si sviluppano più software per sistemi simili tra di loro, cioè quando tra due software alcuni dei requisiti sono in comune. Le tracce aiutano a capire quali siano le classi che implementano un particolare requisito, quindi quali andare ad inserire in un nuovo progetto che richieda le stesse funzionalità offerte.

La Change Impact Analysis consiste invece nell'analisi degli effetti che un cambiamento può apportare all'interno di un sistema. Uno dei possibili casi d'uso è la creazione di tracce tra un requisito, le classi del codice che lo soddisfa e il test case che ne verifica la correttezza. Nel momento in cui sia necessario effettuare un cambiamento al requisito di partenza è possibile calcolare il numero delle classi che potrebbero dover essere modificate grazie alle tracce. È possibile inoltre sapere quali sono i test case da modificare e lanciare nel caso in cui un requisito fosse modificato. Un cambiamento può essere implementato in modi diversi, la Change Impact Analysis serve anche a determinare quale possa essere il metodo più conveniente e quante risorse (uomo/ora) possano essere necessarie.

![Software Traceability](../assets/Vertical-Traceability.jpg)

Per quanto detto così possa sembrare semplice, bisogna pensare che le componenti di codice hanno legami di dipendenza (tracce) tra di loro, questo comporta che quando da un requisito si calcola il codice necessario alla sua implementazione è necessario esaminare tutte le dipendenze a cascata con la possibilità di far crescere in maniera esponenziale gli elementi dipendenti. Per diminuire gli elementi non realmente dipendenti una delle possibili soluzioni è di aggiungere della semantica alle tracce, caratterizzarle quindi con aggettivi del tipo: include, dipende, implementa, necessita di, ecc...

Per avere senso le tracce però devono essere corrette e curate dall'inizio di un progetto, questo comporta però un costo di tempo e risorse durante lo sviluppo davvero notevole, ragion per cui si stanno impiegando parecchie risorse nella ricerca di soluzioni basate sull'Information Retrieval per poter costruire tracce in maniera automatica su un software già sviluppato in precedenza.
