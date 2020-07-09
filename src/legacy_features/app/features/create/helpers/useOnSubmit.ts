import { useCallback } from 'react';

import {
  createEarningFx,
  createExpenseFx,
} from '&front/application/transaction';

import { fieldsToIncomeModel } from './fieldsToIncomeModel';
import { fieldsToOutcomeModel } from './fieldsToOutcomeModel';
import { Kind } from './Kind';

export const useOnSubmit = () => {
  const onSubmit = useCallback(async (fields) => {
    if (fields.kind === Kind.Income) {
      const income = fieldsToIncomeModel(fields);
      await createEarningFx(income);
    }

    if (fields.kind === Kind.Outcome) {
      const outcome = fieldsToOutcomeModel(fields);
      await createExpenseFx(outcome);
    }
  }, []);

  return onSubmit;
};
