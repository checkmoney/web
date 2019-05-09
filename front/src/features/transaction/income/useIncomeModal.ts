import { useModalActions } from '@breadhead/use-modal'

import { IncomeModal } from './IncomeModal'
import { INCOME_KEY } from './INCOME_KEY'

export const useIncomeModal = () => {
  const { open } = useModalActions(INCOME_KEY)

  return {
    open,
    IncomeModal,
  }
}
