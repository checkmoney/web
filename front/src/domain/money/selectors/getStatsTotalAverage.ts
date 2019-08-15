import { createSelector } from 'reselect';

import { Currency } from '&shared/enum/Currency';
import { GroupBy } from '&shared/enum/GroupBy';
import { createAverageReducer } from '&shared/helpers/createAverageReducer';

import { getStatsAverage } from './getStatsAverage';

export const getStatsTotalAverage = (currency: Currency, groupBy: GroupBy) =>
  createSelector(
    getStatsAverage(currency, groupBy),
    optionalStats =>
      optionalStats.map(stats => ({
        income: stats
          .map(item => item.income)
          .filter(Boolean)
          .reduce(createAverageReducer(), 0),
        outcome: stats
          .map(item => item.outcome)
          .filter(Boolean)
          .reduce(createAverageReducer(), 0),
      })),
  );
