import { useModalState } from '@breadhead/use-modal';
import React from 'react';

import { TransactionModal } from '../components/transaction-modal';
import { INCOME_KEY } from './INCOME_KEY';

export const IncomeModal = () => {
  const id = useModalState(INCOME_KEY);

  return <TransactionModal id={id} modalKey={INCOME_KEY} title="Income" />;
};
