export interface BlogPostSummary {
  title: string;
  slug: string;
  description: string;
  publishDate: string;
  url: string;
}

const THEMES = ['light', 'dark'] as const;
const SOUND_IDS = ['badum', 'sad', 'quanto', 'bianchi'] as const;

let cachedPosts: BlogPostSummary[] | null = null;
let pageToolsController: AbortController | null = null;

export async function fetchPostsIndex(signal?: AbortSignal): Promise<BlogPostSummary[]> {
  if (cachedPosts) {
    return cachedPosts;
  }
  const response = await fetch('/api/posts.json', { signal });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = (await response.json()) as BlogPostSummary[];
  cachedPosts = data;
  return data;
}

export function filterPosts(
  posts: BlogPostSummary[],
  query?: string,
  year?: number,
  limit = 10,
): BlogPostSummary[] {
  const normalizedQuery = query?.trim().toLowerCase() ?? '';
  const terms = normalizedQuery ? normalizedQuery.split(/\s+/) : [];

  return posts
    .filter((post) => {
      if (typeof year === 'number' && !post.publishDate.startsWith(String(year))) {
        return false;
      }
      if (terms.length === 0) {
        return true;
      }
      const haystack = `${post.title} ${post.description} ${post.slug}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    })
    .slice(0, limit);
}

export async function registerSiteWebMCPTools(): Promise<void> {
  if (!('modelContext' in document) || !document.modelContext) {
    return;
  }

  pageToolsController?.abort();
  const controller = new AbortController();
  pageToolsController = controller;
  const { signal: registrationSignal } = controller;

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
      execute: async (
        { query, year, limit = 10 }: { query?: string; year?: number; limit?: number },
        { signal },
      ) => {
        const safeLimit =
          typeof limit === 'number' && Number.isInteger(limit) && limit >= 1 && limit <= 50
            ? limit
            : 10;
        if (query !== undefined && typeof query !== 'string') {
          return { error: 'Fornisci una stringa di ricerca valida.' };
        }
        if (
          year !== undefined &&
          (typeof year !== 'number' || !Number.isInteger(year) || year < 2011 || year > 2030)
        ) {
          return { error: 'Fornisci un anno di pubblicazione valido compreso tra il 2011 e il 2030.' };
        }

        try {
          const posts = await fetchPostsIndex(signal);
          const matches = filterPosts(posts, query, year, safeLimit);
          return {
            count: matches.length,
            posts: matches,
          };
        } catch (err) {
          if (signal.aborted) {
            throw err;
          }
          return {
            error:
              err instanceof Error
                ? `Impossibile caricare l'indice degli articoli: ${err.message}`
                : "Impossibile caricare l'indice degli articoli.",
          };
        }
      },
      annotations: { readOnlyHint: true },
    },
    { signal: registrationSignal },
  );

  await document.modelContext.registerTool(
    {
      name: 'get_author_profile',
      description:
        "Restituisce il profilo professionale, lo stack tecnologico e i link social ufficiali di Giuseppe Frattura. Usa questo strumento quando l'utente chiede informazioni sull'autore del blog o su come contattarlo.",
      inputSchema: {
        type: 'object',
        properties: {},
      },
      execute() {
        return {
          name: 'Giuseppe Frattura',
          role: 'Sviluppatore Software',
          location: 'Milano, Italia',
          education: 'Laurea in Informatica — Università degli Studi di Napoli Federico II',
          domains: ['Fintech', 'E-commerce', 'Telecomunicazioni'],
          techStack: [
            'Java',
            'Spring Boot',
            'Docker',
            'CI/CD',
            'PostgreSQL',
            'RabbitMQ',
            'Git',
            'Maven',
            'GitLab CI',
          ],
          interests: ['Clean Code', 'Homelab', 'Intelligenza Artificiale', 'Fotografia', 'Sport'],
          links: {
            website: 'https://giuseppefrattura.com/',
            linkedin: 'https://www.linkedin.com/in/giuseppefrattura/',
            youtube: 'https://www.youtube.com/channel/UC8pnHbjxkGgl9b9awlyPtWA',
            instagram: 'https://www.instagram.com/giuseppefrattura/',
            twitter: 'https://twitter.com/PeppeFrattura',
            tiktok: 'https://www.tiktok.com/@giuseppefrattura4',
          },
        };
      },
      annotations: { readOnlyHint: true },
    },
    { signal: registrationSignal },
  );

  await document.modelContext.registerTool(
    {
      name: 'set_site_theme',
      description:
        "Imposta il tema visivo del sito web e aggiorna la preferenza salvata nel browser. Usa questo strumento quando l'utente chiede di passare al tema chiaro o scuro.",
      inputSchema: {
        type: 'object',
        properties: {
          theme: {
            type: 'string',
            enum: THEMES,
            description: "Stile cromatico da applicare all'interfaccia del sito.",
          },
        },
        required: ['theme'],
      },
      execute({ theme }: { theme: (typeof THEMES)[number] }) {
        if (!THEMES.includes(theme)) {
          return { error: 'Tema non supportato.', supportedThemes: THEMES };
        }
        const rootEl = document.documentElement;
        if (theme === 'dark') {
          rootEl.classList.add('theme-dark');
        } else {
          rootEl.classList.remove('theme-dark');
        }
        try {
          localStorage.setItem('theme', theme);
        } catch {
          // Storage might be disabled in private browsing contexts.
        }
        const labels = document.querySelectorAll('.theme-toggle > label');
        labels.forEach((label) => {
          const input = label.querySelector('input') as HTMLInputElement | null;
          const isMatch = label.getAttribute('data-theme') === theme;
          label.classList.toggle('checked', isMatch);
          if (input) {
            input.checked = isMatch;
          }
        });
        return { activeTheme: theme };
      },
    },
    { signal: registrationSignal },
  );

  await document.modelContext.registerTool(
    {
      name: 'navigate_to_page',
      description:
        "Apre una pagina o un articolo specifico all'interno del sito giuseppefrattura.com. Usa questo strumento quando l'utente chiede di visitare una sezione o di leggere un post trovato.",
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Percorso interno del sito che inizia con /, ad esempio /blog/ o /links/.',
          },
        },
        required: ['path'],
      },
      execute({ path }: { path: string }) {
        if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//')) {
          return {
            error: 'Fornisci un percorso interno valido che inizi con /.',
            mainSections: ['/', '/blog/', '/links/', '/uauaua/'],
          };
        }
        window.location.assign(path);
        return { navigatingTo: path };
      },
    },
    { signal: registrationSignal },
  );

  const articleEl = document.querySelector('article.content');
  if (articleEl) {
    await document.modelContext.registerTool(
      {
        name: 'get_current_article',
        description:
          "Estrae il titolo, la struttura dei paragrafi, i blocchi di codice e il testo dell'articolo attualmente visualizzato. Usa questo strumento per analizzare, riassumere o copiare configurazioni dal post aperto.",
        inputSchema: {
          type: 'object',
          properties: {},
        },
        execute() {
          const title = document.querySelector('header h1')?.textContent?.trim() ?? document.title;
          const meta = document.querySelector('header p')?.textContent?.trim() ?? '';
          const headings = Array.from(articleEl.querySelectorAll('h2, h3')).map((h) =>
            h.textContent?.trim(),
          );
          const codeBlocks = Array.from(articleEl.querySelectorAll('pre code')).map((code) =>
            code.textContent?.trim() ?? '',
          );
          const contentText = articleEl.textContent?.replace(/\s+/g, ' ').trim() ?? '';

          return {
            title,
            meta,
            url: window.location.href,
            headings,
            codeBlocks,
            contentText,
          };
        },
        annotations: { readOnlyHint: true },
      },
      { signal: registrationSignal },
    );
  }

  const soundButtons = document.querySelectorAll<HTMLButtonElement>('button[data-audio]');
  if (soundButtons.length > 0) {
    await document.modelContext.registerTool(
      {
        name: 'play_sound_effect',
        description:
          "Riproduce uno degli effetti sonori presenti nella soundboard della pagina. Usa questo strumento quando l'utente chiede di ascoltare un effetto audio.",
        inputSchema: {
          type: 'object',
          properties: {
            soundId: {
              type: 'string',
              enum: SOUND_IDS,
              description: "Identificativo dell'effetto sonoro da avviare.",
            },
          },
          required: ['soundId'],
        },
        execute: async ({ soundId }: { soundId: (typeof SOUND_IDS)[number] }) => {
          if (!SOUND_IDS.includes(soundId)) {
            return { error: 'Effetto sonoro non trovato.', availableSounds: SOUND_IDS };
          }
          const audio = document.getElementById(soundId);
          if (!(audio instanceof HTMLMediaElement)) {
            return { error: `Elemento audio "${soundId}" non presente nella pagina.` };
          }
          try {
            audio.currentTime = 0;
            await audio.play();
            return {
              played: soundId,
              label: audio.getAttribute('aria-label') ?? soundId,
            };
          } catch {
            audio.focus();
            return {
              error:
                "La riproduzione automatica richiede prima un'interazione utente sulla pagina. Il controllo audio è stato messo a fuoco.",
              soundId,
            };
          }
        },
      },
      { signal: registrationSignal },
    );
  }
}

