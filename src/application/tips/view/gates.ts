import { createGate } from 'effector-react';

import { forwardOpenGateState } from '&front/application/view';

import { fetchTipsFx } from '../domain/store';

const TipsGate = createGate();

forwardOpenGateState({
  gate: TipsGate,
  target: fetchTipsFx,
});

export { TipsGate };
