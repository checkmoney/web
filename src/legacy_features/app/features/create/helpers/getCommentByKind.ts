import { Kind } from './Kind';

export const getCommentByKind = (kind: Kind) =>
  ({
    [Kind.Income]: 'Источник',
    [Kind.Outcome]: 'Категория',
  }[kind]);
