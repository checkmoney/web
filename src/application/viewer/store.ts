import { createStore, createEvent } from 'effector';

import { decodeToken } from './token/decode_token';
import { persistToken } from './token/persist_token';

const tokenChanged = createEvent<string | null>();

const $token = createStore<string | null>(null).on(
  tokenChanged,
  (_, newToken) => newToken,
);

$token.watch(tokenChanged, persistToken);

const $viewer = $token.map((token) => {
  if (!token) {
    return {};
  }

  return decodeToken(token);
});

export { tokenChanged, $token, $viewer };
