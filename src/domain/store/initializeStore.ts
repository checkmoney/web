import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import { applicationSaga } from '&front/app';
import { createApi } from '&front/domain/api';

import { reducer } from './reducer';
import { State } from './State';

export const initializeStore = (initialState?: State) => {
  const thunkMiddleware = thunk.withExtraArgument(createApi);
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware, sagaMiddleware)),
  );

  sagaMiddleware.run(applicationSaga);

  return store;
};
