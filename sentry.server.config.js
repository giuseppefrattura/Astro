import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: "https://37d0b46c2fc0bc86e3300ba92cfcedcf@o4509241765068800.ingest.de.sentry.io/4509241767034960",
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/astro/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  // Enable logs to be sent to Sentry
  enableLogs: true,
  // Define how likely traces are sampled. Adjust this value in production,
  // or use tracesSampler for greater control.
  tracesSampleRate: 1.0,
});