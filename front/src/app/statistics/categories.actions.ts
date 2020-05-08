import { Action } from 'redux';

import { Interval } from '&front/api/types';
import { GroupBy } from '&shared/enum/GroupBy';

import { PeriodCategories } from './categories.types';

export enum CategoriesActions {
  Requested = 'STATISTICS_CATEGORIES_Requested',
  DataReceived = 'STATISTICS_CATEGORIES_DataReceived',
  FatalErrorHappened = 'STATISTICS_CATEGORIES_FatalErrorHappened',
}

export interface CategoriesRequestedAction
  extends Action<CategoriesActions.Requested> {
  payload: {
    periodType: GroupBy;
    dateRange: Interval;
    attempt: number;
  };
}
export const categoriesRequested = (
  periodType: GroupBy,
  dateRange: Interval,
  attempt: number = 1,
): CategoriesRequestedAction => ({
  type: CategoriesActions.Requested,
  payload: { periodType, attempt, dateRange },
});

export interface CategoriesDataReceivedAction
  extends Action<CategoriesActions.DataReceived> {
  payload: {
    periodType: GroupBy;
    dateRange: Interval;
    data: PeriodCategories[];
  };
}
export const categoriesDataReceived = (
  periodType: GroupBy,
  dateRange: Interval,
  data: PeriodCategories[],
): CategoriesDataReceivedAction => ({
  type: CategoriesActions.DataReceived,
  payload: { data, periodType, dateRange },
});

export interface CategoriesFatalErrorHappenedAction
  extends Action<CategoriesActions.FatalErrorHappened> {
  payload: {
    periodType: GroupBy;
    dateRange: Interval;
  };
}
export const categoriesFatalErrorHappened = (
  periodType: GroupBy,
  dateRange: Interval,
): CategoriesFatalErrorHappenedAction => ({
  type: CategoriesActions.FatalErrorHappened,
  payload: { periodType, dateRange },
});
