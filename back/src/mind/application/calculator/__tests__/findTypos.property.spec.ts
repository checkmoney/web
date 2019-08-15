import fc from 'fast-check';
import { capitalize } from 'lodash';

import { findTypos } from '../findTypos';

describe('findTypos#property', () => {
  test('should return empty for empty input', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string(), 0),
        variants => findTypos(variants).length === 0,
      ),
    );
  });

  test('should return empty for exactly one item', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string(), 1),
        variants => findTypos(variants).length === 0,
      ),
    );
  });

  test('should return typos for words with differect case', () => {
    fc.assert(
      fc.property(
        fc
          .lorem(1, false)
          .filter(str => str.length > 2)
          .map(str => [str, capitalize(str)]),
        variants => {
          const typos = findTypos(variants);

          const [original, capitalized] = variants;
          const [firstTypoGroup] = typos;

          return (
            firstTypoGroup.has(original) &&
            firstTypoGroup.has(capitalized) &&
            typos.length === 1
          );
        },
      ),
    );
  });
});
