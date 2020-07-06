import Axios, { AxiosInstance } from 'axios';
import { plainToClass } from 'class-transformer';

import { PeriodCategories } from '&front/app/statistics/categories.types';
import { Currency } from '&front/application/profile';
import { PeriodType, DateRange } from '&front/shared';

import { addTokenToHttpConfig, intervalForQuery } from '../api.utils';

export class StatisticsApi {
  private readonly http: AxiosInstance;

  constructor(url: string, private readonly token: string) {
    const serviceUrl = url;

    this.http = Axios.create({
      baseURL: serviceUrl,
    });
  }

  fetchCategories = async (periodType: PeriodType, dateRange: DateRange) => {
    const { data, headers } = await this.http.get(
      `v1/statistics/categories?periodType=${periodType}&${intervalForQuery(
        dateRange,
      )}`,
      addTokenToHttpConfig(this.token, {}),
    );

    return {
      data: plainToClass(PeriodCategories, data),
      meta: this.getMeta(headers),
    };
  };

  private getMeta = (headers: any) => ({
    currency: headers['checkmoney-currency'] as Currency,
  });
}
