import { createGate } from 'effector-react';

import { forwardOpenGateState } from '&front/application/view';

import { existCategoriesRequested } from '../domain/exist_categories_store';
import { fetchFirstTransactionDateFx } from '../domain/meta_store';

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

export { ExistsCategoriesGate, FirstTransactionDateGate };
