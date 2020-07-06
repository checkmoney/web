import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { createApi } from '&front/domain/api';

import { reducer } from './reducer';
import { State } from './State';

export const initializeStore = (initialState?: State) => {
  const thunkMiddleware = thunk.withExtraArgument(createApi);

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );

  return store;
};
