import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';

import { ExtraArg } from './ExtraArg';
import { State } from './State';

export const useThunk = () => {
  const dispatch = useDispatch();

  return async <Result = Promise<void>>(
    action: ThunkAction<Result, State, ExtraArg, AnyAction>,
  ) => dispatch(action as any);
};
