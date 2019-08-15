import React from 'react';

import { useModalState } from '@breadhead/use-modal';

import { OUTCOME_KEY } from './OUTCOME_KEY';
import { TransactionModal } from '../components/transaction-modal';

export const OutcomeModal = () => {
  const id = useModalState(OUTCOME_KEY);

  return <TransactionModal modalKey={OUTCOME_KEY} id={id} title="Outcome" />;
};
