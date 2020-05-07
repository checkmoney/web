import { AxiosRequestConfig } from 'axios';

import { Interval } from './types';

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
