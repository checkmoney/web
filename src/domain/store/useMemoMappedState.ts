import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { State } from './State';

export const useMemoMappedState = <T>(
  selector: (state: State) => T,
  deps: any[],
) => {
  const memoSelector = useMemo(() => selector, deps);

  const state = useSelector(memoSelector);

  return state;
};
