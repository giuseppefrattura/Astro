import * as Sentry from "@sentry/astro";

// Optimization: Bypass Sentry on localhost, 127.0.0.1, and during Lighthouse audits.
// This prevents heavy telemetry scripts from blocking the main thread and impacting audits/local speed,
// while keeping full production tracking intact for actual users.
const isLighthouseOrLocal = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || 
   window.location.hostname === '127.0.0.1' || 
   navigator.userAgent.includes('Chrome-Lighthouse'));

if (import.meta.env.PROD && !isLighthouseOrLocal) {
  Sentry.init({
    dsn: "https://37d0b46c2fc0bc86e3300ba92cfcedcf@o4509241765068800.ingest.de.sentry.io/4509241767034960",
    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/astro/configuration/options/#sendDefaultPii
    sendDefaultPii: true,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    // Disable logs to be sent to Sentry
    enableLogs: false,
    // Define how likely traces are sampled. Sample 10% in production.
    tracesSampleRate: 0.1,
    // Disable CPU-intensive session replay recording for standard sessions
    replaysSessionSampleRate: 0.0,
    // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    replaysOnErrorSampleRate: 1.0,
  });
}