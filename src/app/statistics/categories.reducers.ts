import { uniqBy } from 'lodash';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { PeriodType, DateRange } from '&front/shared';

import { actions } from './categories.actions';
import { PeriodCategories } from './categories.types';

type StateData = { [key in PeriodType]?: PeriodCategories[] };

export interface CategoriesState extends StateData {
  errors: Array<{ dateRange: DateRange; periodType: PeriodType }>;
}

const initialState: CategoriesState = {
  errors: [],
};

export const categoriesReducer = reducerWithInitialState(initialState)
  .case(actions.done, (state, { params, result }) => ({
    ...state,
    [params.periodType]: uniqBy(
      [...(state[params.periodType] || []), ...result],
      (item) => item.period.identity,
    ),
    errors: state.errors.filter(
      (error) =>
        error.dateRange.identity !== params.dateRange.identity &&
        error.periodType !== params.periodType,
    ),
  }))
  .case(actions.failed, (state, { params }) => ({
    ...state,
    errors: uniqBy(
      [...state.errors, params],
      (error) => `${error.dateRange.identity}-${error.periodType}`,
    ),
  }));
