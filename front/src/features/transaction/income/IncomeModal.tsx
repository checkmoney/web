import { useModalState } from '@breadhead/use-modal'

import { Modal } from '@front/ui/components/layout/modal'

import { INCOME_KEY } from './INCOME_KEY'

export const IncomeModal = () => {
  const id = useModalState(INCOME_KEY)

  return (
    <Modal id={INCOME_KEY} title="Income">
      Modal {id}
    </Modal>
  )
}
