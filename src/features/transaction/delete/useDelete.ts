import { useCallback } from 'react';

import { useThunk } from '&front/domain/store';
import { deleteTransaction } from '&front/domain/money/actions/deleteTransaction';

export const useDelete = () => {
  const dispatch = useThunk();

  const handleDelete = useCallback(async (id: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Удаляем?')) {
      await dispatch(deleteTransaction(id));
    }
  }, []);

  return { handleDelete };
};
