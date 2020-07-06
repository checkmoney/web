import { AxiosRequestConfig } from 'axios';
import { format } from 'date-fns';

import { DateRange } from '&front/shared';

export const intervalForQuery = ({ start, end }: DateRange) => {
  const pattern = 'YYYY-MM-DD';
  return `start=${format(start, pattern)}&end=${format(end, pattern)}`;
};

export const addTokenToHttpConfig = (
  token: string,
  config: AxiosRequestConfig = {},
): AxiosRequestConfig => {
  const headers = {
    ...(config.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  return {
    ...config,
    headers,
  };
};
