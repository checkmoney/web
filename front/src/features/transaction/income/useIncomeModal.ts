import { useModalActions } from '@breadhead/use-modal';

import { INCOME_KEY } from './INCOME_KEY';
import { IncomeModal } from './IncomeModal';

export const useIncomeModal = () => {
  const { open } = useModalActions(INCOME_KEY);

  return {
    open,
    IncomeModal,
  };
};
