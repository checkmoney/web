import actionCreatorFactory from 'typescript-fsa';

import { RequireType } from './require.types';

const actionCreator = actionCreatorFactory('REQUIRE');

export const actions = {
  dataRequired: actionCreator<RequireType>('DATA'),
};
