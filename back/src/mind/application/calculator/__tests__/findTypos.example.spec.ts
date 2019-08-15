import { findTypos } from '../findTypos';

describe('findTypos#example', () => {
  test('should return typo for plural version', () => {
    const variants = ['Book', 'Books'];
    const typos = findTypos(variants);

    const [firstTypo] = typos;
    const [first, second] = variants;

    expect(firstTypo).toContain(first);
    expect(firstTypo).toContain(second);
  });
});
