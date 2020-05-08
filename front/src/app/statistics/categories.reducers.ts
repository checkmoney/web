import { uniqBy } from 'lodash';

import { Interval } from '&front/api/types';
import { intervalIdentity } from '&front/api/utils';
import { GroupBy } from '&shared/enum/GroupBy';

import {
  CategoriesDataReceivedAction,
  CategoriesRequestedAction,
  CategoriesFatalErrorHappenedAction,
  CategoriesActions,
} from './categories.actions';
import { PeriodCategories } from './categories.types';

type StateData = { [key in GroupBy]?: PeriodCategories[] };

export interface CategoriesState extends StateData {
  errors: Array<{ dateRange: Interval; periodType: GroupBy }>;
}

const initialState: CategoriesState = {
  errors: [],
};

type CategoriesAction =
  | CategoriesDataReceivedAction
  | CategoriesRequestedAction
  | CategoriesFatalErrorHappenedAction;

export const categoriesReducer = (
  state: CategoriesState = initialState,
  action: CategoriesAction,
): CategoriesState => {
  switch (action.type) {
    case CategoriesActions.DataReceived:
      return {
        ...state,
        [action.payload.periodType]: uniqBy(
          [...(state[action.payload.periodType] || []), ...action.payload.data],
          item => intervalIdentity(item.period),
        ),
      };
    case CategoriesActions.FatalErrorHappened:
      return {
        ...state,
        errors: uniqBy(
          [...state.errors, action.payload],
          error => `${intervalIdentity(error.dateRange)}-${error.periodType}`,
        ),
      };
    default:
      return state;
  }
};
