import * as Sentry from "@sentry/astro";

// Keep error reporting and tracing active from startup for users and audits alike.
const isLocal = typeof window !== 'undefined' &&
  ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);

if (import.meta.env.PROD && !isLocal) {
  Sentry.init({
    dsn: "https://37d0b46c2fc0bc86e3300ba92cfcedcf@o4509241765068800.ingest.de.sentry.io/4509241767034960",
    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/astro/configuration/options/#sendDefaultPii
    sendDefaultPii: true,
    integrations: [
      Sentry.browserTracingIntegration(),
    ],
    // Disable logs to be sent to Sentry
    enableLogs: false,
    // Filter out known third-party browser noise, including Meta/Instagram In-App Browser (IAB) bridge errors
    ignoreErrors: [
      "Java object is gone",
      "Error invoking postMessage: Java object is gone",
      "Java exception was raised during method invocation",
    ],
    denyUrls: [
      // Injected scripts from Meta In-App Browser on Android
      /^iabjs:\/\//i,
      /navigation_performance_logger_android/i,
    ],
    // Define how likely traces are sampled. Sample 10% in production.
    tracesSampleRate: 0.1,
    // Disable CPU-intensive session replay recording for standard sessions
    replaysSessionSampleRate: 0.0,
    // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    replaysOnErrorSampleRate: 1.0,
  });

  // Split the recorder out of the initial bundle. Errors remain captured immediately;
  // replay context starts after load, so it cannot include the initial loading phase.
  const loadReplay = () => {
    const enable = () => { void import('./src/lib/sentry-replay').then(({ enableReplay }) => enableReplay()).catch(() => {
      // A failed optional recorder must not interrupt normal error reporting.
    }); };
    if ('requestIdleCallback' in window) window.requestIdleCallback(enable, { timeout: 2000 });
    else setTimeout(enable, 0);
  };
  if (document.readyState === 'complete') loadReplay();
  else window.addEventListener('load', loadReplay, { once: true });
}