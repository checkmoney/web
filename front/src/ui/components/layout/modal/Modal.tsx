import { Modal as AntModal } from 'antd'
import { ReactNode } from 'react'

import { useModalState, useModalActions } from '@breadhead/use-modal'

interface Props {
  id: string
  title: string
  children: ReactNode
}

export const Modal = ({ id, children, title }: Props) => {
  const state = useModalState(id)
  const { close } = useModalActions(id)

  const visible = !!state

  return visible ? (
    <AntModal
      title={title}
      visible={true}
      onCancel={close}
      onOk={close}
      footer={null}
    >
      {children}
    </AntModal>
  ) : null
}
