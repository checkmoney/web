import { AxiosRequestConfig } from 'axios';

import { Interval } from './types';
import { format } from 'date-fns';

export const intervalForQuery = ({ start, end }: Interval) =>
  `start=${start}&end=${end}`;

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
