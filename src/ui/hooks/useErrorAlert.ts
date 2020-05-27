import { notification } from 'antd';
import { useEffect } from 'react';
import { Option } from 'tsoption';

export const useErrorAlert = (
  error: Option<string>,
  customMessage?: string,
) => {
  useEffect(() => {
    if (error.nonEmpty()) {
      const message = customMessage || error.get();

      notification.error({
        message,
      });
    }
  }, [customMessage, error]);
};
