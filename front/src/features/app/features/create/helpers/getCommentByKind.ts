import { Kind } from './Kind'

export const getCommentByKind = (kind: Kind) =>
  ({
    [Kind.Income]: 'transaction:source',
    [Kind.Outcome]: 'transaction:category',
  }[kind])
