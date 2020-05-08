import { uniq } from 'lodash';

import { GroupBy } from '&shared/enum/GroupBy';

import {
  GrowActions,
  GrowDataReceivedAction,
  GrowRequestedAction,
  GrowFatalErrorHappenedAction,
} from './grow.actions';
import { Grow } from './grow.types';

type StateData = { [key in GroupBy]?: Grow };

export interface GrowState extends StateData {
  errors: GroupBy[];
}

const initialState: GrowState = {
  errors: [],
};

type GrowAction =
  | GrowDataReceivedAction
  | GrowRequestedAction
  | GrowFatalErrorHappenedAction;

export const growReducer = (
  state: GrowState = initialState,
  action: GrowAction,
): GrowState => {
  switch (action.type) {
    case GrowActions.DataReceived:
      return {
        ...state,
        [action.payload.periodType]: action.payload.data,
        errors: state.errors.filter(
          error => error !== action.payload.periodType,
        ),
      };
    case GrowActions.FatalErrorHappened:
      return {
        ...state,
        errors: uniq([...state.errors, action.payload.periodType]),
      };
    default:
      return state;
  }
};
