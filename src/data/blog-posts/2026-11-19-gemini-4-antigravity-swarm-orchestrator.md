---
slug: gemini-4-antigravity-swarm-orchestrator
title: "La rivoluzione multi-agente su Google Antigravity: Gemini 4 Neon, Hydrogen, Orchestrator e /swarm"
description: "Come Carbon, Neon, Hydrogen, Orchestrator e /swarm organizzano il lavoro di sviluppo software tra pianificazione, esecuzione e verifica."
published: true
publishDate: 19 Nov 2026
---


Nel corso di novembre 2026, il team di Google Antigravity ha presentato una serie di aggiornamenti che, letti insieme, delineano un'architettura completa per lo sviluppo software e il lavoro cognitivo nell'era degli agenti autonomi. I tre annunci riguardano Gemini 4 Carbon e la funzione **/swarm**, Gemini 4 Hydrogen con **Orchestrator** e, infine, Gemini 4 Neon.

## Gemini 4 Carbon e /swarm: il lavoro di squadra tra agenti autonomi

**Riferimento:** [“Gemini 4 Carbon and /swarm”](https://antigravity.google/blog/gemini-4-carbon-in-google-antigravity/) (10 novembre 2026).

![Gemini 4 Carbon e orchestrazione multi-agente con /swarm](https://antigravity.google/assets/image/blog/4-Carbon---Wide.png)


Il primo pilastro è Gemini 4 Carbon, modello progettato per l'ingegneria del software a lungo orizzonte, la ricerca scientifica, la sicurezza informatica e l'analisi complessa. Al modello si affianca **/swarm**, una funzione in anteprima che trasforma un singolo prompt in un team coordinato di agenti.

In pratica, `/swarm` serve quando un'attività è troppo ampia per essere affrontata bene da un solo agente: per esempio una migrazione che tocca molti moduli, un'indagine su un bug distribuito o una funzionalità che richiede modifiche e test in più aree del progetto. Dopo aver ricevuto l'obiettivo, l'agente coordinatore lo suddivide in incarichi e assegna il lavoro a worker specializzati, ciascuno nel proprio worktree Git isolato. Gli agenti possono quindi intervenire in parallelo senza sovrascrivere le modifiche altrui; i verificatori controllano poi i risultati e mettono alla prova le soluzioni. La Board, il roster e la timeline permettono allo sviluppatore di seguire il lavoro, vedere le decisioni e intervenire se la direzione va corretta. Il vantaggio è aumentare il lavoro svolto in parallelo mantenendo visibili i passaggi; il costo è una maggiore velocità di consumo della quota durante l'esecuzione concorrente.

- **Orchestrazione nativa:** un agente coordinatore scompone l'obiettivo, avvia agenti esecutori (*worker*) in parallelo in worktree Git isolati e assegna verificatori avversari che testano le modifiche.
- **Supervisione in tempo reale:** una Board live mostra il lavoro e i compromessi discussi dagli agenti; il roster dei membri permette di ispezionare l'uso degli strumenti o intervenire sulla traiettoria di un agente; una timeline grafica consente di ripercorrere il processo dal brief al risultato verificato.
- **Ruoli ed efficienza:** Carbon è adatto al coordinamento, all'architettura e agli audit di sicurezza, mentre modelli più leggeri possono lavorare in parallelo sulle modifiche. Gli agenti inattivi non consumano token, ma il lavoro parallelo può esaurire la quota più rapidamente di una chat tradizionale.

## Gemini 4 Hydrogen e Orchestrator: velocità e collaborazione intelligente

**Riferimento:** [“Gemini 4 Hydrogen and Orchestrator”](https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity/) (12 novembre 2026).

![Gemini 4 Hydrogen e Orchestrator](https://antigravity.google/assets/image/blog/4-Hydrogen---Wide.png)


Due giorni dopo è arrivato Gemini 4 Hydrogen insieme a **Orchestrator**. Hydrogen è il modello ad alta velocità ed efficienza per le attività quotidiane che non richiedono una pianificazione separata: aggiornare pacchetti, scrivere test unitari, rimuovere duplicazioni o generare script rapidi.

Il modello offre quattro livelli di ragionamento — Low, Medium, High ed Extra — e una finestra di contesto fino a un milione di token. Al livello predefinito High, Google dichiara una velocità 2,5 volte superiore a Gemini 3.8 Flash.

Orchestrator evita di dover cambiare modello manualmente durante una sessione: abbina un modello pianificatore, inizialmente Carbon, a Hydrogen come esecutore.

La novità è che i due modelli collaborano dentro la stessa attività, invece di limitarsi a scegliere una volta per tutte un modello in base al prompt iniziale. Il pianificatore (Carbon, o Neon nelle configurazioni che lo supportano) esamina il repository in sola lettura, chiarisce le dipendenze e traduce la richiesta in passi verificabili. Hydrogen prende poi in carico il lavoro operativo: modifica i file, aggiorna i pacchetti ed esegue build e test. Se emerge un problema che richiede una decisione — per esempio un test continua a fallire o il piano non copre un caso importante — Hydrogen restituisce il controllo al pianificatore, che rilegge lo stato aggiornato, rivede il piano e delega la ripresa. In questo modo il modello più capace viene usato soprattutto per ragionare e correggere la rotta, mentre quello più rapido gestisce le iterazioni quotidiane. Orchestrator è quindi adatto a interventi articolati ma circoscritti a un singolo flusso di lavoro; `/swarm` è utile quando conviene distribuire parti indipendenti del lavoro a più agenti contemporaneamente.

1. **Pianificazione:** il pianificatore esplora la codebase in sola lettura e prepara un piano concreto.
2. **Esecuzione:** Hydrogen applica le modifiche, scrive il codice, esegue build e test e controlla i risultati.
3. **Gestione degli imprevisti:** se Hydrogen incontra un ostacolo — per esempio un test che fallisce due volte o un'ambiguità progettuale — restituisce il controllo al pianificatore, che può esaminare lo stato, correggere il piano e far riprendere il lavoro.

## Gemini 4 Neon: il punto d'incontro tra ragionamento e rapidità

**Riferimento:** [“Gemini 4 Neon in Google Antigravity”](https://antigravity.google/blog/gemini-4-neon-in-google-antigravity/) (18 novembre 2026).

![Gemini 4 Neon in Google Antigravity](https://antigravity.google/assets/image/blog/4-Neon---Wide.png)


Gemini 4 Neon completa la famiglia occupando lo spazio tra la profondità analitica di Carbon e la rapidità di Hydrogen. È pensato per attività quotidiane impegnative: modifiche che coinvolgono un intero repository, debugging, refactoring, generazione di codice sicuro e ragionamento STEM.

Secondo i benchmark interni di Antigravity, Neon registra il tasso di allucinazioni più basso del team. Al livello di ragionamento Extra High ottiene il primo posto sull'Artificial Analysis Coding Agent Index, con 58,6, e su AutomationBench di Zapier, con il 56,3%. Al livello predefinito High, Google dichiara un costo per attività inferiore del 32% rispetto a Carbon.

### Neon e Hydrogen lavorano insieme

Con il lancio di Neon, Orchestrator può abbinare direttamente Gemini 4 Neon — nel ruolo di architetto e pianificatore — a Gemini 4 Hydrogen, che si occupa dell'esecuzione rapida. La combinazione punta a mantenere decisioni di qualità e contenere il consumo di quota.

Neon si integra anche con **/swarm**. Google mostra il sistema mentre genera e testa applicazioni complesse, tra cui un gioco multiplayer a più livelli eseguito nel browser integrato, con un agente che partecipa come secondo giocatore.

Gemini 4 Neon e Orchestrator (Neon) sono disponibili per gli abbonati a pagamento Google AI Pro e Google AI Ultra e per le aziende tramite Gemini for Business. L'accesso è previsto nell'app desktop Antigravity, nella CLI e nelle estensioni IDE.

## Riepilogo dell'ecosistema Gemini 4 su Antigravity

| Componente | Ruolo principale | Punti di forza |
| --- | --- | --- |
| **Gemini 4 Carbon** | Ragionamento profondo e architettura | Progetti a lungo orizzonte, cybersecurity e coordinamento di team complessi. |
| **Gemini 4 Neon** | Equilibrio tra intelligenza e velocità | Benchmark agentici di coding, costo dichiarato inferiore del 32% per task rispetto a Carbon e quattro livelli di ragionamento. |
| **Gemini 4 Hydrogen** | Esecuzione rapida ad alto volume | Modifiche al codice, test, build e manutenzione quotidiana. |
| **Orchestrator** | Collaborazione tra due modelli in una sessione | Neon (o Carbon) pianifica e revisiona, Hydrogen esegue il lavoro operativo. |
| **/swarm** | Team multi-agente parallelo | Coordinatore, worker in worktree Git isolati e verificatori avversari attivati da un singolo prompt. |

Per vedere un esempio pratico, **“Gemini 4 Swarm: 1 Prompt, 31 AI Agents Rebuild the Eiffel Tower”** mostra il coordinamento parallelo degli agenti a partire da una singola richiesta.

Il disegno complessivo è una divisione del lavoro su più livelli: Carbon affronta i problemi che richiedono ragionamento profondo e coordinamento, Neon offre un equilibrio per i flussi di lavoro impegnativi, Hydrogen gestisce l'esecuzione veloce e Orchestrator o /swarm collegano modelli e agenti in un unico processo.
