import { createGate } from 'effector-react';
import { forwardOpenGateState } from '&front/application/view';
import { existCategoriesRequested } from '../domain/exist_categories_store';

const ExistsCategoriesGate = createGate();
forwardOpenGateState({
  gate: ExistsCategoriesGate,
  target: existCategoriesRequested,
});

export { ExistsCategoriesGate };
