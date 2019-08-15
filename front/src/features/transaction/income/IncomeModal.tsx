import React from 'react';

import { useModalState } from '@breadhead/use-modal';

import { INCOME_KEY } from './INCOME_KEY';
import { TransactionModal } from '../components/transaction-modal';

export const IncomeModal = () => {
  const id = useModalState(INCOME_KEY);

  return <TransactionModal id={id} modalKey={INCOME_KEY} title="Income" />;
};
