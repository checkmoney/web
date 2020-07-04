import { $token } from './token_store';
import { decodeToken } from './token/decode_token';

export const $manager = $token.map((token) => {
  const isManager = token ? decodeToken(token).isManager : false;

  return { isManager };
});
