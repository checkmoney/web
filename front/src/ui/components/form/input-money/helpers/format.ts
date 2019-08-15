import { head } from 'lodash';

const PREFIX_ZERO_REDEX = /^(0+)/g;
const SEPARATOR_REGEX = /(\.|,)+/g;
const NON_MONEY_CHARS_REGEX = /[^(\d,\.)]/g;
const MANY_SPACES_REGEX = /\s\s+/g;
const MONEY_REGEX = /^(\d*)(\.|,){0,1}(\d){0,2}/gm;

export const format = (value: string | number | undefined) =>
  head(
    `${value || '0'}`
      .replace(PREFIX_ZERO_REDEX, '')
      .replace(MANY_SPACES_REGEX, ' ')
      .replace(SEPARATOR_REGEX, '.')
      .replace(NON_MONEY_CHARS_REGEX, '')
      .match(MONEY_REGEX),
  ) || '0';
