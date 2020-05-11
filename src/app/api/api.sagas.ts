import getConfig from 'next/config';
import { select } from 'redux-saga/effects';

import { StatisticsApi } from '&front/app/api/parts/StatisticsApi';
import { getTokenValue } from '&front/domain/user/selectors/getToken';

const { publicRuntimeConfig } = getConfig();
const { statsUrl } = publicRuntimeConfig;

export function* createStatisticsApi() {
  const token: ReturnType<typeof getTokenValue> = yield select(getTokenValue);

  if (!token) {
    // TODO: specicif
    throw new Error('Try to use private API for anon user');
  }

  const apiClient = new StatisticsApi(statsUrl, token);

  return apiClient;
}
