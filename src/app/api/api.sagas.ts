/* eslint-disable require-yield */

import { StatisticsApi } from '&front/app/api/parts/StatisticsApi';
import { $token } from '&front/application/viewer';
import { $configuration } from '&front/application/configuration';
import { loggedOut } from '&front/application/login';

export function* createStatisticsApi() {
  const token = $token.getState();
  const { statsUrl } = $configuration.getState();

  if (!token) {
    loggedOut();
    throw new Error('Try to use private API for anon user');
  }

  const apiClient = new StatisticsApi(statsUrl, token);

  return apiClient;
}
