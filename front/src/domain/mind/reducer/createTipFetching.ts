import { createFetchingRedux, FetchingState } from 'redux-clear';

type State = FetchingState;

const { reducer, actions } = createFetchingRedux('manager/create-tip-fetching');

export { reducer, actions, State };
