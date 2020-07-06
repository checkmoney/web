import { Base64 } from 'js-base64';
import { dropRight, flow } from 'lodash';

interface TokenPayloadModel {
  login: string;
  isManager: boolean;
}

const removeSignature = (token: string) =>
  dropRight(token.split('.'), 1).join('.');
const getJsonMatches = (decoded: string) =>
  decoded.match(new RegExp('{.+?}', 'gi')) || [];
const parseJson = (matches: string[]) =>
  matches.map((item) => JSON.parse(item));
const mergeObjects = (objects: object[]) =>
  objects.reduce(
    (acc, cur) => ({
      ...acc,
      ...cur,
    }),
    {},
  );

export const decodeToken = (token: string): TokenPayloadModel =>
  flow([
    removeSignature,
    Base64.decode,
    getJsonMatches,
    parseJson,
    mergeObjects,
  ])(token);
