import { useModalActions } from '@breadhead/use-modal';

import { OutcomeModal } from './OutcomeModal';
import { OUTCOME_KEY } from './OUTCOME_KEY';

export const useOutcomeModal = () => {
  const { open } = useModalActions(OUTCOME_KEY);

  return {
    open,
    OutcomeModal,
  };
};
