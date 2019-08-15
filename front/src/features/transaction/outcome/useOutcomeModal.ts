import { useModalActions } from '@breadhead/use-modal';

import { OUTCOME_KEY } from './OUTCOME_KEY';
import { OutcomeModal } from './OutcomeModal';

export const useOutcomeModal = () => {
  const { open } = useModalActions(OUTCOME_KEY);

  return {
    open,
    OutcomeModal,
  };
};
