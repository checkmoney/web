import { createStore, createEvent } from 'effector';

import { persistToken } from './token/persist_token';

const tokenChanged = createEvent<string | null>();

const $token = createStore<string | null>(null).on(
  tokenChanged,
  (_, newToken) => newToken,
);

$token.watch(tokenChanged, persistToken);

export { $token, tokenChanged };
