import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('AUTH');

export const actions = {
  unauthorized: actionCreator('UNAUTHORIZED'),
};
