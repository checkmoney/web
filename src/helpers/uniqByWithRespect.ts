import { sortBy, last, uniq } from 'lodash';

type GetKey<T, K> = (v: T) => K;
type GetRespect<T> = (v: T) => number;

export const uniqByWithRespect = <T, K>(
  arr: T[],
  uniqBy: GetKey<T, K>,
  respectWith: GetRespect<T>,
): T[] => {
  const uniqKeys = uniq(arr.map(uniqBy));

  return uniqKeys
    .map((key) =>
      last(
        sortBy(
          arr.filter((item) => uniqBy(item) === key),
          respectWith,
        ),
      ),
    )
    .filter((item) => item !== undefined) as T[];
};
