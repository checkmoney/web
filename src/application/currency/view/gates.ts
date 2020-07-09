import { createGate } from 'effector-react';

import { forwardOpenGateState } from '&front/application/view';

import { fetchUserCurrencyFx } from '../domain/preferences';

const CurrencyGate = createGate<void>();
forwardOpenGateState({ gate: CurrencyGate, target: fetchUserCurrencyFx });

export { CurrencyGate };
