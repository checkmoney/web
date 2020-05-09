import { subYears } from 'date-fns';
import { ClearAction, createClearRedux } from 'redux-clear';

type State = Date;

interface Actions {
  set: ClearAction<[Date]>;
}

const { actions, reducer } = createClearRedux<State, Actions>(
  {
    set: () => newDate => newDate,
  },
  subYears(new Date(), 1),
  'money/first-transaction-date',
);

export { actions, reducer, State };
