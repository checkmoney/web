import { Modal as AntModal } from 'antd';
import React, { ReactNode } from 'react';

import { useModalState, useModalActions } from '@breadhead/use-modal';

interface Props {
  id: string;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const Modal = ({ id, children, title, footer = null }: Props) => {
  const state = useModalState(id);
  const { close } = useModalActions(id);

  const visible = !!state;

  return visible ? (
    <AntModal
      title={title}
      visible={true}
      onCancel={close}
      onOk={close}
      footer={footer}
    >
      {children}
    </AntModal>
  ) : null;
};
