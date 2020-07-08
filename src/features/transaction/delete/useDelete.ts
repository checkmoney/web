import { useCallback } from 'react';

import { deleteTransactionFx } from '&front/application/transaction';

export const useDelete = () => {
  const handleDelete = useCallback(async (id: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Удаляем?')) {
      await deleteTransactionFx(id);
    }
  }, []);

  return { handleDelete };
};
