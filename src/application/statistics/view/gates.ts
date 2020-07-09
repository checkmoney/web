import { createGate } from 'effector-react';

import { PeriodType } from '&front/shared';
import { forwardOpenGateState } from '&front/application/view';

import { StatisticsRequest } from '../types/statistics_request';
import { fetchCategoriesFx } from '../domain/categories_store';
import { fetchPeriodAmountsFx } from '../domain/periods_store';
import { fetchGrowFx } from '../domain/grow_store';

const PeriodsAmountGate = createGate<StatisticsRequest>();
forwardOpenGateState({ gate: PeriodsAmountGate, target: fetchPeriodAmountsFx });

const CategoriesGate = createGate<StatisticsRequest>();
forwardOpenGateState({ gate: CategoriesGate, target: fetchCategoriesFx });

const GrowGate = createGate<PeriodType>();
forwardOpenGateState({ gate: GrowGate, target: fetchGrowFx });

export { GrowGate, CategoriesGate, PeriodsAmountGate };
