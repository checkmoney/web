import { createStore } from 'effector';

import { config } from '&front/app/config';

export const $configuration = createStore({
  backUrl: config('BACK_URL'),
  statsUrl: config('STATS_URL'),
  googleClientId: config('GOOGLE_CLIENT_ID'),
});
