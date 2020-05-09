import { FetchingState } from 'redux-clear';

export const mergeFetchingState = (
  one: FetchingState,
  two: FetchingState,
): FetchingState => {
  return {
    loading: one.loading || two.loading,
    error: one.error.nonEmpty() ? one.error : two.error,
  };
};
