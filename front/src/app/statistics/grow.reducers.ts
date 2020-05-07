import { get, uniq } from 'lodash';

import { GroupBy } from '&shared/enum/GroupBy';

import {
  GrowActions,
  GrowDataReceivedAction,
  GrowRequestedAction,
  GrowFatalErrorHappenedAction,
} from './grow.actions';
import { GrowItem } from './grow.types';

export type GrowState = {
  [key in keyof typeof GroupBy]?: GrowItem;
} & {
  errors?: GroupBy[];
};

type GrowAction =
  | GrowDataReceivedAction
  | GrowRequestedAction
  | GrowFatalErrorHappenedAction;

export const growReducer = (
  state: GrowState | undefined,
  action: GrowAction,
): GrowState => {
  switch (action.type) {
    case GrowActions.DataReceived:
      return {
        ...state,
        [action.payload.periodType]: action.payload.data,
        errors: (get(state, 'errors') || []).filter(
          error => error !== action.payload.periodType,
        ),
      };
    case GrowActions.FatalErrorHappened:
      return {
        ...state,
        errors: uniq([
          ...(get(state, 'errors') || []),
          action.payload.periodType,
        ]),
      };
    default:
      return state || {};
  }
};
