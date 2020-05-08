import { AxiosRequestConfig } from 'axios';
import { format } from 'date-fns';

import { Interval } from './types';

export const intervalForQuery = ({ start, end }: Interval) => {
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

export const intervalIdentity = (interval: Interval) => {
  const pattern = 'YYYY-MM-DD';
  return `${format(interval.start, pattern)}-${format(interval.end, pattern)}`;
};
