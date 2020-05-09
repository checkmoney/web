import { useModalActions } from '@breadhead/use-modal';
import React, { useCallback } from 'react';

import { deleteTransaction } from '&front/domain/money/actions/deleteTransaction';
import { useThunk } from '&front/domain/store';
import { Button } from '&front/ui/components/form/button';
import { Modal } from '&front/ui/components/layout/modal';

interface Props {
  title: string;
  modalKey: string;
  id: string;
}

export const TransactionModal = ({ modalKey, id, title }: Props) => {
  const dispatch = useThunk();
  const { close } = useModalActions(modalKey);

  const onDelete = useCallback(async () => {
    if (confirm('Are you sure?')) {
      await dispatch(deleteTransaction(id));
      close();
    }
  }, [id, close]);

  const footer = (
    <>
      <Button onClick={onDelete}>Delete transaction</Button>
    </>
  );

  return (
    <Modal id={modalKey} title={title} footer={footer}>
      <p>Transaction {id}</p>
      <p>We add some information to this modal later.</p>
    </Modal>
  );
};
