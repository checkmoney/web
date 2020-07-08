import { createGate } from 'effector-react';

import { forwardOpenGateState } from '&front/application/view';
import { DateRange } from '&front/shared';

import { existCategoriesRequested } from '../domain/exist_categories_store';
import { fetchFirstTransactionDateFx } from '../domain/meta_store';
import { fetchHistoryFx } from '../domain/history_store';

const HistoryGate = createGate<DateRange>();
forwardOpenGateState({
  gate: HistoryGate,
  target: fetchHistoryFx,
});

const ExistsCategoriesGate = createGate();
forwardOpenGateState({
  gate: ExistsCategoriesGate,
  target: existCategoriesRequested,
});

const FirstTransactionDateGate = createGate();
forwardOpenGateState({
  gate: FirstTransactionDateGate,
  target: fetchFirstTransactionDateFx,
});

export { ExistsCategoriesGate, FirstTransactionDateGate, HistoryGate };
