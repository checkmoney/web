import { findBestMatch } from 'string-similarity';

import { tryOr } from '&shared/helpers/tryOr';

export const findTypos = (variants: string[]) => {
  const TYPO_THRESHOLD = 0.4;

  const pairs = variants
    .map(original => ({
      original,
      bestMatch: tryOr(
        () =>
          findBestMatch(original, variants.filter(v => v !== original))
            .bestMatch,
        undefined,
      ),
    }))
    .filter(({ bestMatch }) => !!bestMatch)
    .filter(({ bestMatch }) => bestMatch.rating > TYPO_THRESHOLD)
    .map(({ original, bestMatch }) => [original, bestMatch.target]);

  // Do not rewrite this with `reduce`, please
  const sameSets: string[][] = [];

  pairs.forEach(pair => {
    const exist = sameSets.find(same =>
      pair.some(suggestion => same.includes(suggestion)),
    );

    if (!exist) {
      // add new set — pair
      sameSets.push(pair);
      return;
    }

    // add pait to exist set
    exist.push(...pair);
  });

  // clear duplications
  return sameSets.map(same => new Set(same));
};
