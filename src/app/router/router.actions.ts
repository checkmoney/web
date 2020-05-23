import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('ROUTER');

export const actions = {
  push: actionCreator<string>('PUSH'),
};
