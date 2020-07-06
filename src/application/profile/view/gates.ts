import { createGate } from 'effector-react';
import { forward } from 'effector';

import { fetchUserCurrencyFx } from '../domain';

const CurrencyGate = createGate<void>();

forward({ from: CurrencyGate.open, to: fetchUserCurrencyFx });

export { CurrencyGate };
