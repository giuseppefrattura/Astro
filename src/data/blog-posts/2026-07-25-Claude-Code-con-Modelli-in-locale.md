---
slug: claude-code-con-modelli-in-locale
title: Guida alla configurazione di Claude Code con Modelli in locale
description: Come configurare Claude Code in ambiente locale in modo da non dipendere da servizi cloud.
published: true
publishDate: 25 Jul 2026
---

Introduzione
------------

Esistono diversi assistenti di intelligenza artificiale dedicati al coding. In questo tutorial esamineremo da vicino Claude Code, un assistente AI che funziona direttamente da riga di comando (terminale). Claude Code supporta l'integrazione con Ollama, un motore di inferenza locale. In questo modo è possibile sfruttare le sue funzionalità mantenendo i propri dati completamente in locale e soprattutto gratis.


## Installazione

L'installazione di Claude Code si esegue rapidamente da terminale con il seguente comando bash:

Bash

```
curl -fsSL https://claude.ai/install.sh | bash
```

PowerShell
```
irm https://claude.ai/install.ps1 | iex
```

Per l'installazione di Ollama andate sul suo sito https://ollama.com/download. 

### Disattivare la trasmissione dei dati (Data Usage)

Per impostazione predefinita, Claude Code raccoglie e monitora le statistiche di utilizzo. Per garantire la massima privacy quando si utilizzano modelli locali, è consigliabile disattivare questa funzione tramite variabile d'ambiente.

È possibile configurare le impostazioni a livello *managed*, *user*, *project* o *local*. Per comodità, usiamo lo scope **user**:

1. Vai nella tua cartella utente (`~`).
2. Entra nella cartella `.claude` (se non esiste, creala).
3. Crea un file chiamato `settings.json` e inserisci la seguente configurazione per disabilitare il traffico non essenziale:

JSON

```
{
  "model": "gemma4:12b-mlx",
  "env": {
    "DISABLE_TELEMETRY": "1",
    "DISABLE_BUG_COMMAND": "1",
    "DISABLE_ERROR_REPORTING": "1",
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0",
    "ANTHROPIC_AUTH_TOKEN": "ollama",
    "ANTHROPIC_API_KEY": "",
    "ANTHROPIC_BASE_URL": "http://localhost:11434"
  }
}
```

### Configurare il System Prompt

Aggiungere un **System Prompt** predefinito è una buona pratica per dare al modello linee guida precise sullo stile di codice, lo stack tecnologico e le convenzioni da seguire.

Crea un file chiamato `CLAUDE.md` all'interno della cartella `.claude`. Le istruzioni definite in questo file verranno applicate globalmente a tutti i tuoi progetti. (Se in seguito vorrai personalizzare le regole per uno specifico progetto, ti basterà creare un file `CLAUDE.md` nella directory radice del repository di quel progetto).

Ecco un esempio di `CLAUDE.md` per uno sviluppatore Java/Spring Boot:

Markdown

```
Sei un assistente esperto per uno sviluppatore Java professionista. Tutti gli esempi di codice, le revisioni e le spiegazioni devono essere coerenti con il seguente stack tecnologico:
* Backend: Java (ultima versione LTS), Spring Boot (ultima versione stabile), PostgreSQL.
* Segui le best practice moderne per API RESTful, ORM, unit testing (JUnit) e integrazione frontend-backend.
* Usa Maven per la gestione delle dipendenze Java.
* Ogni volta che è richiesto codice per il database, usa la sintassi e le convenzioni PostgreSQL.
* Spiega sempre le tue scelte e fornisci riferimenti alla documentazione quando dai consigli di architettura.
* In caso di dubbi, fai domande di chiarimento prima di generare il codice.
```

## Esempio Alternativo con MTPLX

MTPLX è un runtime di inferenza nativo ad alte prestazioni, progettato specificamente per Apple Silicon (Mac M1, M2, M3, M4, M5), ideato per accelerare la generazione di testo nei modelli di intelligenza artificiale locali (LLM) tramite la tecnologia Multi-Token Prediction (MTP).

JSON

```
{
  "model": "Qwen3.5-9B",
  "env": {
    "DISABLE_TELEMETRY": "1",
    "DISABLE_BUG_COMMAND": "1",
    "DISABLE_ERROR_REPORTING": "1",
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0",
    "ANTHROPIC_AUTH_TOKEN": "MTPLX",
    "ANTHROPIC_API_KEY": "",
    "ANTHROPIC_BASE_URL": "http://localhost:8000"
  }
}
```