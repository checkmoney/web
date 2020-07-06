import { createGate } from 'effector-react';
import { forward } from 'effector';

import { PeriodType } from '&front/shared';

import { StatisticsRequest } from '../types/statistics_request';
import {
  fetchPeriodAmountsFx,
  fetchGrowFx,
  fetchCategoriesFx,
} from '../domain';

const PeriodsAmountGate = createGate<StatisticsRequest>();
forward({
  from: PeriodsAmountGate.state,
  to: fetchPeriodAmountsFx,
});

const CategoriesGate = createGate<StatisticsRequest>();
forward({
  from: CategoriesGate.state,
  to: fetchCategoriesFx,
});

const GrowGate = createGate<PeriodType>();
forward({
  from: GrowGate.state,
  to: fetchGrowFx,
});

export { GrowGate, CategoriesGate, PeriodsAmountGate };
