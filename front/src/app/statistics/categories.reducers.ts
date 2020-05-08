import { uniqBy, get } from 'lodash';

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

export type CategoriesState = {
  [key in keyof typeof GroupBy]?: PeriodCategories[];
} & {
  errors?: Array<{ dateRange: Interval; periodType: GroupBy }>;
};

type CategoriesAction =
  | CategoriesDataReceivedAction
  | CategoriesRequestedAction
  | CategoriesFatalErrorHappenedAction;

export const categoriesReducer = (
  state: CategoriesState | undefined,
  action: CategoriesAction,
): CategoriesState => {
  switch (action.type) {
    case CategoriesActions.DataReceived:
      return {
        ...state,
        [action.payload.periodType]: uniqBy<PeriodCategories>(
          [
            ...get(state || {}, action.payload.periodType, []),
            ...action.payload.data,
          ],
          item => intervalIdentity(item.period),
        ),
      };
    case CategoriesActions.FatalErrorHappened:
      return {
        ...state,
        errors: uniqBy(
          [...(get(state, 'errors') || []), action.payload],
          error => `${intervalIdentity(error.dateRange)}-${error.periodType}`,
        ),
      };
    default:
      return state || {};
  }
};
