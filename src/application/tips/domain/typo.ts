import { attach, forward } from 'effector';

import { requestFx, Method } from '&front/application/api';

import { tipHidden, fetchTipsFx } from './store';

interface MergeTypo {
  token: string;
  merge: {
    primary: string;
    secondary: string[];
  };
}

const mergeTypoInCategoryFx = attach({
  effect: requestFx,
  mapParams: ({ merge }: MergeTypo) => ({
    method: Method.Post,
    path: '/mind/typo/merge',
    body: merge,
  }),
});

// Before start, hide tip from UI
forward({
  from: mergeTypoInCategoryFx,
  to: tipHidden.prepend(({ token }) => token),
});

// After done, refetch tips
forward({
  from: mergeTypoInCategoryFx.done,
  to: fetchTipsFx,
});

export { mergeTypoInCategoryFx };
