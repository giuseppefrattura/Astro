---
slug: 9router-homelab-minipc
title: "9Router nel mio Homelab: come usare Pi Agent e Claude Code gratis su un MiniPC"
description: "Guida pratica per installare 9Router via Docker su un MiniPC nel proprio homelab, risparmiare token con RTK e collegare Pi Coding Agent e Claude Code con fallback automatico."
published: true
publishDate: 27 Oct 2026
---

Introduzione
------------

Di recente mi sono imbattuto in un ottimo [video di ZazenCodes su YouTube](https://www.youtube.com/watch?v=OrG6Tya_WhU) che mostra come far girare un agente di coding AI a costo zero combinando tre strumenti open source: **9Router**, **Pi Coding Agent** e **RTK**.

Nel video l'intera infrastruttura viene installata su una VPS cloud a pagamento per averla sempre attiva. Guardandolo, però, mi sono fatto una domanda: *perché pagare un abbonamento mensile per una VPS quando ho già un MiniPC acceso H24 nel mio homelab?*

In questo articolo vi mostro come ho replicato e adattato questa configurazione installando **9Router direttamente sul MiniPC del mio homelab** tramite Docker, rendendolo accessibile sia in rete locale (LAN) sia fuori casa tramite **Tailscale**, per alimentare **Pi Agent** (e persino **Claude Code**) senza costi ricorrenti.

---

Cos'è 9Router e quale problema risolve?
---------------------------------------

Chi utilizza quotidianamente agenti di coding da terminale conosce bene due problemi: i **costi delle API** che crescono rapidamente durante i loop autonomi e i temuti errori `429 Too Many Requests` (rate limit) quando si sfruttano i tier gratuiti o gli abbonamenti flat.

[**9Router**](https://github.com/decolua/9router) è un gateway AI open source che funge da proxy universale (compatibile con lo standard OpenAI e Anthropic) sulla porta `20128`. Si posiziona tra i nostri strumenti di sviluppo (Pi Agent, Claude Code, Cursor, Cline) e oltre 40 provider di modelli AI.

![Dashboard di 9Router in esecuzione sul MiniPC](../assets/9router.png)
*La dashboard di 9Router sul mio MiniPC: monitoraggio in tempo reale di richieste, token in cache, costi stimati e grafo dei provider collegati (Antigravity, OpenCode Free, OpenRouter, Gemini CLI).*

Il suo vero punto di forza è il sistema di **Auto-Fallback multi-livello (Combo)**:
1. **Tier 1 (Abbonamenti o modelli principali):** utilizza i modelli migliori che hai già a disposizione.
2. **Tier 2 (Provider economici):** subentra se il primo livello è temporaneamente saturo.
3. **Tier 3 (Modelli 100% gratuiti):** sfrutta i tier gratuiti offerti da vari provider (OpenRouter free, OpenCode Free, Gemini CLI, Antigravity, iFlow, Qwen, Kiro, modelli locali) come rete di sicurezza.

Se un modello raggiunge il limite di richieste al minuto o restituisce un errore, 9Router intercetta il problema e passa istantaneamente la richiesta al modello successivo della lista, senza interrompere il lavoro dell'agente.

### 9Router vs LiteLLM e `free-claude-code`: quale scegliere?

Nel panorama dei proxy AI open source non esiste solo 9Router. Prima di adottarlo nel mio homelab ho valutato anche altre due soluzioni molto diffuse:

* **[LiteLLM](https://github.com/BerriAI/litellm):** è il punto di riferimento (soprattutto in ambito enterprise e Python) per unificare oltre 100 LLM dietro un'unica API compatibile con OpenAI, con funzioni avanzate di load balancing, gestione budget e chiavi virtuali per team. Tuttavia, per un homelab personale orientato agli agenti di coding, LiteLLM richiede una configurazione YAML più verbosa, mentre **9Router** offre un'interfaccia grafica immediata, il collegamento rapido tramite OAuth agli abbonamenti già attivi (es. Gemini CLI, Antigravity, Claude) e la gestione visuale delle *Combo*.
* **[free-claude-code](https://github.com/alishahryar1/free-claude-code):** un ottimo progetto open source leggero (basato su FastAPI) nato specificamente per utilizzare Claude Code a costo zero, traducendo al volo le chiamate Anthropic SSE verso provider gratuiti (come NVIDIA NIM, OpenRouter, Gemini) o runtime locali (Ollama, LM Studio, llama.cpp), con filtri RTK e compressione Headroom integrati. Se il vostro unico obiettivo è far girare Claude Code su un singolo provider gratuito in locale è un'alternativa eccellente; 9Router fa però un passo in più quando si vogliono orchestrare contemporaneamente più agenti (**Pi**, **Claude Code**, IDE) da una dashboard centralizzata nel proprio homelab.

---

Perché un MiniPC nell'Homelab invece di una VPS?
------------------------------------------------

Nel tutorial originale viene consigliato il deploy su una VPS remota. Spostare tutto su un **MiniPC domestico** all'interno del proprio homelab offre diversi vantaggi concreti:

* **Zero costi fissi:** se hai già un MiniPC acceso per far girare container Docker, Proxmox o Home Assistant, l'impatto economico aggiuntivo è nullo (9Router è leggerissimo e consuma pochissima RAM).
* **Controllo totale delle chiavi API:** dentro 9Router vengono salvati i token OAuth e le API key di tutti i tuoi provider. Tenerli sul disco locale del tuo homelab anziché su una VPS nel cloud riduce drasticamente la superficie di attacco.
* **Latenza minima in LAN:** quando programmi da casa, le richieste dal tuo Mac o PC verso il MiniPC viaggiano sulla rete locale con tempi di risposta inferiori al millisecondo.
* **Integrazione con modelli locali:** trovandosi già nella tua LAN, 9Router può includere nelle sue catene di fallback anche eventuali istanze locali di [Ollama o MTPLX](/blog/claude-code-con-modelli-in-locale/).

---

Step 1: Installare 9Router sul MiniPC con Docker Compose
--------------------------------------------------------

Il modo più pulito e manutenibile per installare 9Router sul MiniPC è tramite **Docker Compose**, montando un volume persistente per non perdere le configurazioni e le chiavi API quando si aggiorna l'immagine.

Collegati in SSH al tuo MiniPC, crea una cartella dedicata (es. `~/docker/9router`) e aggiungi il seguente file `docker-compose.yml`:

```yaml
services:
  9router:
    image: decolua/9router:latest
    container_name: 9router
    restart: unless-stopped
    ports:
      - "20128:20128"
    volumes:
      - "$HOME/.9router:/app/data"
    environment:
      - DATA_DIR=/app/data
```

Avvia il container in background:

```bash
docker compose up -d
```

Una volta avviato, puoi aprire il browser dal tuo computer principale e accedere alla dashboard web di 9Router puntando all'indirizzo IP locale del tuo MiniPC:

```text
http://192.168.1.100:20128
```
*(Sostituisci `192.168.1.100` con l'IP effettivo del tuo MiniPC nella LAN).*

---

Step 2: Configurare Provider, Modelli Gratuiti e "Combo"
--------------------------------------------------------

Dalla dashboard web di 9Router puoi collegare in pochi clic i tuoi provider:

1. Vai nella sezione **Providers** e collega gli account o i tier gratuiti che vuoi utilizzare (ad esempio OpenRouter con i modelli `:free`, Google Gemini, Qwen, ecc.).
2. Vai nella sezione **Combos** e crea una catena di fallback personalizzata (chiamiamola ad esempio `homelab-coder`).
3. Inserisci all'interno della Combo 3 o 4 modelli in ordine di preferenza. Quando un modello gratuito esaurirà i token al minuto, 9Router passerà automaticamente al secondo e così via.

Puoi verificare dal tuo terminale che l'endpoint API risponda correttamente interrogando la lista dei modelli esposti dal MiniPC:

```bash
curl http://192.168.1.100:20128/v1/models \
  -H "Authorization: Bearer LA_TUA_API_KEY_9ROUTER"
```

---

Step 3: Collegare Pi Coding Agent a 9Router
-------------------------------------------

**Pi** (`@mariozechner/pi-coding-agent`) è un agente di coding da terminale minimale, velocissimo ed estremamente estensibile, perfetto da abbinare a 9Router perché non ti vincola a un singolo fornitore AI.

### Installazione di Pi

Sul tuo computer di sviluppo (oppure direttamente sul MiniPC), installa Pi tramite lo script ufficiale:

```bash
curl -fsSL https://pi.dev/install.sh | sh
```

### Gestire l'API Key in modo sicuro

Invece di inserire le chiavi in chiaro nei file di configurazione, è buona norma salvarle in un file `.secrets` nella propria home directory (`~/.secrets`) con permessi ristretti (`chmod 600 ~/.secrets`):

```bash
export NINE_ROUTER_API_KEY="sk-9r-..."
```

E caricarlo automaticamente dal proprio `~/.zshrc` (o `~/.bashrc`):

```bash
[ -f "$HOME/.secrets" ] && source "$HOME/.secrets"
```

### Configurare `models.json`

Per istruire Pi a utilizzare il 9Router del nostro MiniPC, creiamo o modifichiamo il file `~/.pi/agent/models.json`:

```json
{
  "providers": {
    "9router": {
      "baseUrl": "http://192.168.1.100:20128/v1",
      "api": "openai-completions",
      "apiKey": "NINE_ROUTER_API_KEY",
      "models": [
        {
          "id": "homelab-coder",
          "name": "Homelab Fallback Combo",
          "reasoning": true,
          "input": ["text"],
          "contextWindow": 128000,
          "maxTokens": 16384
        }
      ]
    }
  }
}
```

Ora basta avviare `pi` nella cartella di un progetto e selezionare il modello `homelab-coder` (oppure uno qualsiasi dei modelli singoli esposti da 9Router): tutte le richieste passeranno attraverso il MiniPC.

---

Bonus: Collegare anche Claude Code al MiniPC
--------------------------------------------

Se oltre a Pi utilizzi **Claude Code**, la bella notizia è che 9Router espone endpoint pienamente compatibili anche con il protocollo Anthropic.

Come avevamo già visto nella [guida per usare Claude Code con modelli locali](/blog/claude-code-con-modelli-in-locale/), ti basta modificare il file `~/.claude/settings.json` sul tuo Mac/PC puntando `ANTHROPIC_BASE_URL` all'IP del MiniPC:

```json
{
  "model": "homelab-coder",
  "env": {
    "DISABLE_TELEMETRY": "1",
    "DISABLE_BUG_COMMAND": "1",
    "DISABLE_ERROR_REPORTING": "1",
    "ANTHROPIC_AUTH_TOKEN": "LA_TUA_API_KEY_9ROUTER",
    "ANTHROPIC_API_KEY": "",
    "ANTHROPIC_BASE_URL": "http://192.168.1.100:20128"
  }
}
```

In questo modo puoi passare da Pi a Claude Code sfruttando esattamente lo stesso router, le stesse statistiche di consumo e le stesse regole di fallback centralizzate sul MiniPC, ottenendo un risultato simile a quanto offerto da progetti dedicati come [free-claude-code](https://github.com/alishahryar1/free-claude-code) o da un proxy [LiteLLM](https://github.com/BerriAI/litellm), ma gestendo tutto da un'unica interfaccia web.

---

Step 4: Risparmiare Token con RTK
---------------------------------

Quando un agente AI lavora su un repository, gran parte dei token non viene consumata per scrivere codice, ma per **leggere l'output dei comandi di terminale**: `git status`, `git diff`, lunghe liste di file o log di test falliti.

Per evitare di bruciare inutilmente la finestra di contesto (e i rate limit dei modelli gratuiti), la combinazione ideale prevede due livelli di ottimizzazione:

1. **RTK (Rust Token Killer):** un piccolo binario CLI che intercetta e comprime l'output dei comandi più verbosi (riducendo del 60–80% il rumore nei log di `git`, `grep` e test runner) prima che vengano letti dall'agente.
2. **Token Saving in 9Router:** direttamente dalla dashboard di 9Router è possibile attivare la compressione automatica del contesto, che sfoltisce i payload ridondanti prima di inoltrare la chiamata al provider finale.

Meno token inviati significa risposte più rapide, minor rischio di allucinazioni su contesti troppo lunghi e soprattutto la possibilità di rimanere quasi sempre dentro le soglie dei modelli gratuiti.

---

Step 5: Accesso fuori casa con Tailscale (e sessioni persistenti)
-----------------------------------------------------------------

Uno dei motivi per cui molti scelgono una VPS è poter usare il proprio agente anche quando sono fuori casa. Con un MiniPC nel proprio homelab si ottiene lo stesso identico risultato — ma in modo molto più sicuro — usando **Tailscale**.

Installando Tailscale sia sul MiniPC sia sul proprio portatile:
* Non devi aprire nessuna porta sul router di casa (niente port forwarding).
* Il tuo MiniPC ottiene un indirizzo IP privato fisso sulla rete Tailscale (es. `100.x.y.z`) o un nome MagicDNS (es. `http://minipc:20128/v1`).
* Se imposti direttamente l'indirizzo Tailscale del MiniPC nel tuo `models.json`, la configurazione funzionerà senza modifiche sia quando sei seduto alla scrivania di casa sia quando lavori in mobilità.

Inoltre, se hai dei task di refactoring molto lunghi, puoi installare **Pi Agent direttamente sul MiniPC**, avviare una sessione persistente con `screen` o `tmux`:

```bash
screen -S coding-session
pi
```

e lasciare che l'agente lavori sul MiniPC interrogando `http://localhost:20128/v1`, anche mentre il tuo portatile è spento o nello zaino.

---

Conclusioni: Punti di forza e limiti
------------------------------------

Portare **9Router** sul MiniPC del mio homelab si è rivelata una scelta vincente:

* **Punti di forza:** costo dell'infrastruttura pari a zero, un unico pannello centralizzato per monitorare token e costi di tutti i miei dispositivi, resilienza ai rate limit grazie alle *Combo* e massima privacy per le mie API key.
* **Limiti da tenere a mente:** i modelli gratuiti sono fantastici per task quotidiani, generazione di componenti, script e test (nel video di ZazenCodes riescono a costruire una calcolatrice React completa senza spendere un centesimo), ma per decisioni architetturali complesse o debugging profondo su codebase enormi i modelli *frontier* a pagamento mantengono ancora una marcia in più.

Il bello di avere 9Router nel proprio homelab è proprio questa flessibilità: usare i modelli gratuiti per l'80% del lavoro di routine e riservare i modelli di fascia alta solo a ciò che conta davvero.

