import { useModalState } from '@breadhead/use-modal';
import React from 'react';

import { TransactionModal } from '../components/transaction-modal';
import { OUTCOME_KEY } from './OUTCOME_KEY';

export const OutcomeModal = () => {
  const id = useModalState(OUTCOME_KEY);

  return <TransactionModal modalKey={OUTCOME_KEY} id={id} title="Outcome" />;
};
