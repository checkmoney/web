import { useMemo } from 'react';
import { useMappedState } from 'redux-react-hook';

import { State } from './State';

export const useMemoMappedState = <T>(
  selector: (state: State) => T,
  deps: any[],
) => {
  const memoSelector = useMemo(() => selector, deps);

  const state = useMappedState(memoSelector);

  return state;
};
