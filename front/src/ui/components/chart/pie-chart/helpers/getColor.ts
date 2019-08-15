import Color from 'color';

import { colorHash } from '&front/helpers/colorHash';

export const getColor = (key: string) =>
  Color(colorHash(key))
    .alpha(0.6)
    .string();
