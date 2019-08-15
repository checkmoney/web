import { Kind } from './Kind';

export const getExampleByKind = (kind: Kind) =>
  ({
    [Kind.Income]: 'NASA',
    [Kind.Outcome]: 'Cafe',
  }[kind]);
