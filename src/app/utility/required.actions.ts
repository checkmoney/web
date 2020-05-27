import actionCreatorFactory from 'typescript-fsa';
import { RequireType } from './required.types';

const actionCreator = actionCreatorFactory('REQUIRE');

const actions = {
  dataRequired: actionCreator<RequireType>('DATA'),
};

export { actions };
