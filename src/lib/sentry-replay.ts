import { addIntegration, replayIntegration } from '@sentry/astro';

export function enableReplay() {
  addIntegration(replayIntegration({ maskAllText: true, blockAllMedia: true }));
}
