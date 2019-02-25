import { useCallback } from 'react'

import { useThunk } from '@front/domain/store'
import { deleteTransaction } from '@front/domain/money/actions/deleteTransaction'
import { Button } from '@front/ui/components/form/button'
import { ButtonType } from '@front/ui/components/form/button'

interface Props {
  id: string
}

export const DeleteButton = ({ id }: Props) => {
  const dispatch = useThunk()

  const deleteAction = useCallback(() => {
    dispatch(deleteTransaction(id))
  }, [dispatch, id])

  return (
    <Button onClick={deleteAction} type={ButtonType.Text}>
      Delete
    </Button>
  )
}
