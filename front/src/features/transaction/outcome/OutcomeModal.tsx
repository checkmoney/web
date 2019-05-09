import { useModalState } from '@breadhead/use-modal'

import { Modal } from '@front/ui/components/layout/modal'

import { OUTCOME_KEY } from './OUTCOME_KEY'

export const OutcomeModal = () => {
  const id = useModalState(OUTCOME_KEY)

  return (
    <Modal id={OUTCOME_KEY} title="Outcome">
      Modal {id}
    </Modal>
  )
}
