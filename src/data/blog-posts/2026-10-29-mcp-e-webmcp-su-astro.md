---
slug: mcp-e-webmcp-su-astro
title: "Cos'è WebMCP e come ho reso questo sito Astro navigabile dagli agenti AI"
description: "Dallo standard MCP al nuovo Web Model Context Protocol (WebMCP) di Google e W3C: guida pratica a come ho esposto i tool del mio blog statico Astro direttamente nel browser."
published: true
publishDate: 29 Oct 2026
---

Introduzione
------------

Negli ultimi mesi il modo in cui interagiamo con il web sta cambiando radicalmente. Non siamo più soltanto noi umani a navigare tra le pagine, cliccare pulsanti e compilare form: sempre più spesso lo fanno **agenti AI** integrati nei nostri browser, nei terminali o negli IDE.

Finora, però, gli agenti che navigano sul web hanno dovuto comportarsi come "utenti bendati": catturano screenshot della pagina, provano a interpretare alberi DOM complessi di migliaia di righe HTML e simulano clic sperando che il layout non cambi. È un approccio lento, fragile e costosissimo in termini di token.

Per risolvere questo problema è nato **WebMCP (Web Model Context Protocol)**, una nuova specifica sviluppata all'interno del W3C (con il contributo dei team di Google Chrome e Microsoft) che porta i principi di **MCP** direttamente dentro il tab del browser.

In questo articolo vediamo cos'è MCP, cosa cambia con WebMCP e **come l'ho appena implementato su questo stesso blog statico in Astro** — così potete provarlo dal vivo proprio sulla pagina che state leggendo.

---

Cos'è MCP (Model Context Protocol)?
-----------------------------------

Introdotto originariamente da Anthropic e diventato rapidamente uno standard open source universale, il **Model Context Protocol (MCP)** viene spesso descritto come *"la porta USB-C per le applicazioni AI"*.

Prima di MCP, per collegare un modello (come Claude, Gemini o un agente locale) a un database, a GitHub o a un file system, bisognava scrivere un'integrazione su misura per ciascun servizio. MCP standardizza questa comunicazione attraverso tre concetti:

* **Tools (Strumenti):** funzioni eseguibili con uno schema JSON ben definito (es. *"cerca un file"*, *"esegui una query"*).
* **Resources (Risorse):** dati e contesti leggibili dal modello.
* **Prompts:** template strutturati per guidare l'interazione.

Il limite dell'MCP tradizionale? **Richiede un server backend attivo** (un processo Node.js o Python in ascolto tramite `stdio` o `HTTP/SSE`) e una configurazione manuale da parte dell'utente. Ed è qui che entra in gioco WebMCP.

---

Cos'è WebMCP e perché cambia il Web?
------------------------------------

**WebMCP** prende il concetto dei *Tools* di MCP e lo sposta **al 100% lato client all'interno del browser**.

Invece di costringere l'agente AI del browser a fare scraping dell'HTML, il sito web espone nativamente le proprie funzionalità tramite una nuova API JavaScript standardizzata su `document.modelContext` e tramite attributi HTML dichiarativi sui `<form>`.

Le differenze chiave rispetto al protocollo MCP classico sono enormi:

| Caratteristica | MCP Classico (Backend) | WebMCP (Browser) |
| :--- | :--- | :--- |
| **Dove gira** | Server remoto o processo locale (`stdio` / `SSE`) | **Dentro il tab del browser aperto dall'utente** |
| **Infrastruttura richiesta** | Server Node.js, Python, Docker | **Nessuna** (funziona anche su siti 100% statici) |
| **Sessione e Sicurezza** | Gestione separata di token e API key | Condivide lo stato, il DOM e il contesto `HTTPS` della pagina |
| **Modalità di definizione** | Codice server-side | **Imperativa** (`document.modelContext.registerTool`) o **Dichiarativa** (`<form toolname="...">`) |

Quando un agente AI visita una pagina dotata di WebMCP, non deve indovinare dove si trova il pulsante per cercare un articolo o cambiare il tema: interroga `document.modelContext`, legge la lista dei tool con i relativi `inputSchema` e li invoca direttamente con una singola chiamata strutturata.

---

Come ho implementato WebMCP su questo sito Astro
------------------------------------------------

Questo blog è generato staticamente con **Astro** e ospitato su S3/CloudFront: non ha un server backend né un database a runtime. Eppure, poiché WebMCP vive interamente nel browser, è stato possibile integrarlo senza aggiungere alcun costo infrastrutturale e mantenendo intatte le [performance su Google Lighthouse](/blog/ottimizzare-sito-astro-con-gemini/).

Ecco i quattro passaggi con cui l'ho implementato.

### 1. Creare un indice JSON statico a build-time (`/api/posts.json`)

Il mio blog conta oltre 150 articoli distribuiti su 16 pagine. Per permettere sia agli agenti AI sia agli utenti di cercare istantaneamente nell'intero archivio senza un database, ho creato una route statica in Astro (`src/pages/api/posts.json.ts`) che durante `astro build` genera il file `/api/posts.json`:

```typescript
import type { APIRoute } from 'astro';
import { getPosts } from '../../lib/posts';

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  const payload = posts.map((post) => ({
    title: post.data.title,
    slug: post.data.slug,
    description: post.data.description,
    publishDate: post.data.publishDate.toISOString().slice(0, 10),
    url: new URL(`/blog/${post.data.slug}/`, site).pathname,
  }));

  return new Response(JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
```

### 2. Configurare i tipi ufficiali `webmcp-types`

Per avere l'autocompletamento e l'inferenza automatica dei tipi TypeScript a partire dal JSON Schema dei tool, ho installato il pacchetto ufficiale `webmcp-types` e l'ho aggiunto al `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "types": ["webmcp-types"]
  }
}
```

### 3. L'API Imperativa: Tool globali e contestuali (`document.modelContext`)

Nel modulo `src/lib/webmcp.ts` ho utilizzato la *feature detection* (`if (!('modelContext' in document) || !document.modelContext) return;`) in modo che i browser che non supportano ancora WebMCP ignorino completamente il codice senza errori.

Per gestire correttamente il ciclo di vita durante la navigazione tra le pagine, ogni registrazione passa un `AbortSignal`: quando si cambia pagina, `pageToolsController.abort()` rimuove in modo pulito i tool della pagina precedente prima di registrare quelli nuovi.

Ho diviso gli strumenti in due categorie:

* **Tool Globali (attivi su tutto il sito):**
  * `search_blog_posts`: interroga `/api/posts.json` (passando il `signal` di cancellazione alla `fetch`) e filtra gli articoli per parola chiave, anno e limite.
  * `get_author_profile`: restituisce in formato JSON strutturato il mio profilo professionale, lo stack tecnologico e i contatti social (evitando allucinazioni quando si chiede a un agente *"Chi è l'autore di questo blog?"*).
  * `set_site_theme`: permette all'agente di passare dal tema chiaro (`light`) al tema scuro (`dark`) aggiornando sia il DOM sia `localStorage`.
  * `navigate_to_page`: consente all'agente di aprire direttamente una sezione o un articolo specifico.
* **Tool Contestuali (registrati dinamicamente solo dove servono):**
  * `get_current_article` (solo nelle pagine `/blog/[slug]/`): estrae il titolo, l'indice dei paragrafi (`h2`/`h3`), il testo pulito e tutti i **blocchi di codice** dell'articolo aperto.
  * `play_sound_effect` (solo nella soundboard [`/uauaua/`](/uauaua/)): permette all'agente AI di far partire gli effetti sonori della pagina (`badum`, `sad`, `quanto`, `bianchi`)!

Ecco un estratto di come viene registrato `search_blog_posts` seguendo le best practice di WebMCP (annotazione `readOnlyHint: true`, gestione di `AbortSignal` e ritorno di errori strutturati invece di eccezioni `throw`):

```typescript
await document.modelContext.registerTool(
  {
    name: 'search_blog_posts',
    description:
      "Cerca articoli nel blog di Giuseppe Frattura per argomento o anno di pubblicazione. Usa questo strumento quando l'utente vuole trovare post su un tema specifico o esplorare l'archivio.",
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Parole chiave o argomento da cercare nei titoli e nelle descrizioni.',
        },
        year: {
          type: 'integer',
          minimum: 2011,
          maximum: 2030,
          description: 'Anno di pubblicazione con cui filtrare gli articoli.',
        },
        limit: {
          type: 'integer',
          minimum: 1,
          maximum: 50,
          default: 10,
          description: 'Numero massimo di articoli da restituire.',
        },
      },
    },
    execute: async ({ query, year, limit = 10 }, { signal }) => {
      try {
        const posts = await fetchPostsIndex(signal);
        const matches = filterPosts(posts, query, year, limit);
        return { count: matches.length, posts: matches };
      } catch (err) {
        if (signal.aborted) throw err;
        return { error: "Impossibile caricare l'indice degli articoli." };
      }
    },
    annotations: { readOnlyHint: true },
  },
  { signal: registrationSignal },
);
```

### 4. L'API Dichiarativa: Il Form di ricerca su `/blog/`

Oltre all'API JavaScript, WebMCP permette di trasformare un normale `<form>` HTML in uno strumento per agenti semplicemente aggiungendo gli attributi `toolname`, `tooldescription`, `toolautosubmit` e `toolparamdescription`.

Nella pagina [Blog](/blog/) ho aggiunto una barra di ricerca che svolge una doppia funzione:
1. **Per i visitatori umani:** filtra in tempo reale gli articoli mostrando i risultati direttamente nella pagina.
2. **Per gli agenti AI:** il browser sintetizza automaticamente lo schema JSON a partire dall'`<input type="search">`, compila il campo (attivando la pseudo-classe CSS `:tool-form-active` che evidenzia il form con un bordo tratteggiato blu) e legge la risposta tramite `event.respondWith(searchPromise)`:

```html
<form
  id="blog-search-form"
  toolname="filter-blog-archive"
  tooldescription="Filtra e mostra gli articoli del blog pertinenti all'argomento cercato."
  toolautosubmit
>
  <label for="blog-search-input">Cerca negli articoli</label>
  <input
    type="search"
    id="blog-search-input"
    name="query"
    toolparamdescription="Es. 9Router, Claude Code, Docker, Leica, Spring Boot"
    required
  />
  <button type="submit">Cerca</button>
</form>
```

---

Come provarlo subito su questo sito
-----------------------------------

Se stai leggendo questo articolo su una versione recente di Google Chrome (o Chrome Dev/Canary), puoi testare i tool WebMCP di questo sito in meno di un minuto:

1. Abilita il flag sperimentale aprendo `chrome://flags/#enable-webmcp-testing`, impostalo su **Enabled** e riavvia il browser.
2. Apri i **Chrome DevTools** (`Cmd + Option + I` su Mac o `F12` su Windows/Linux) direttamente su questa pagina e vai nella scheda **Console**.
3. Esegui questo snippet per vedere tutti i tool esposti dalla pagina corrente:
   ```javascript
   const tools = await document.modelContext.getTools();
   console.table(tools.map(t => ({ name: t.name, description: t.description })));
   ```
4. Prova a invocare il tool contestuale `get_current_article` proprio su questo post oppure `search_blog_posts`:
   ```javascript
   const searchTool = tools.find(t => t.name === "search_blog_posts");
   const res = await document.modelContext.executeTool(searchTool, { query: "9router" });
   console.log(JSON.parse(res));
   ```
5. In alternativa, puoi installare dal Chrome Web Store l'estensione ufficiale **WebMCP - Model Context Tool Inspector**, collegare una API key gratuita di Gemini e chiedere direttamente in chat all'agente di cercare un articolo, cambiare il tema del sito in modalità scura o riprodurre un suono nella pagina [`/uauaua/`](/uauaua/).

---

Conclusioni
-----------

Proprio come i file `sitemap.xml`, i feed RSS e i dati strutturati Schema.org hanno reso il web leggibile ai motori di ricerca, **WebMCP** si prepara a rendere il web nativamente utilizzabile dagli agenti AI.

Il grande vantaggio per chi sviluppa è che si tratta di puro *progressive enhancement*: bastano meno di 2 KB di codice client-side per trasformare anche un semplice blog statico in Astro in un'applicazione pronta per il web agentico.

