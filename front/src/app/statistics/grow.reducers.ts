import { GroupBy } from '&shared/enum/GroupBy';

import { GrowActions } from './grow.actions';
import { GrowItem } from './grow.types';

export interface GrowState {
  [GroupBy.Month]?: GrowItem;
  [GroupBy.Year]?: GrowItem;
}

export const growReducer = (
  state: GrowState | undefined,
  action: any,
): GrowState => {
  switch (action.type) {
    case GrowActions.DataReceived:
      return {
        ...state,
        [action.payload.periodType]: action.payload.data,
      };
    default:
      return state || {};
  }
};
