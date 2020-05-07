import Axios, { AxiosInstance } from 'axios';

import { GrowItem } from '&front/app/statistics/grow.types';
import { GroupBy } from '&shared/enum/GroupBy';

import { addTokenToHttpConfig } from './utils';

export class StatisticsApi {
  private readonly http: AxiosInstance;

  constructor(url: string, private readonly token: string) {
    const serviceUrl = url;

    this.http = Axios.create({
      baseURL: serviceUrl,
    });
  }

  findGrow = async (periodType: GroupBy): Promise<GrowItem> => {
    const { data } = await this.http.get(
      `v1/statistics/grow?periodType=${periodType}`,
      addTokenToHttpConfig(this.token, {}),
    );

    return data;
  };
}
