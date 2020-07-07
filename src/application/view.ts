import { Gate } from 'effector-react';
import { Effect, guard, Event, merge } from 'effector';

interface Params<T> {
  gate: Gate<T>;
  target: Effect<T, any, any> | Event<T>;
}

const forwardOpenGateState = <T>({ gate, target }: Params<T>) =>
  guard({
    source: merge([gate.open, gate.state]),
    filter: gate.status,
    target,
  });

export { forwardOpenGateState };
