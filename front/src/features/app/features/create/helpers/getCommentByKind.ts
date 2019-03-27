import { Kind } from './Kind'

export const getCommentByKind = (kind: Kind) =>
  ({
    [Kind.Income]: 'Source',
    [Kind.Outcome]: 'Category',
  }[kind])
