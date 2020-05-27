import Axios, { AxiosInstance } from 'axios';
import { plainToClass } from 'class-transformer';

import { PeriodCategories } from '&front/app/statistics/categories.types';
import { Grow } from '&front/app/statistics/grow.types';
import { PeriodAmount } from '&front/app/statistics/periods.types';
import { GroupBy } from '&shared/enum/GroupBy';
import { Currency } from '&shared/enum/Currency';

import { Interval } from '../api.types';
import { addTokenToHttpConfig, intervalForQuery } from '../api.utils';

export class StatisticsApi {
  private readonly http: AxiosInstance;

  constructor(url: string, private readonly token: string) {
    const serviceUrl = url;

    this.http = Axios.create({
      baseURL: serviceUrl,
    });
  }

  findGrow = async (periodType: GroupBy) => {
    const { data, headers } = await this.http.get(
      `v1/statistics/grow?periodType=${periodType}`,
      addTokenToHttpConfig(this.token, {}),
    );

    return {
      data: plainToClass(Grow, data),
      meta: this.getMeta(headers),
    };
  };

  fetchCategories = async (periodType: GroupBy, dateRange: Interval) => {
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

  fetchPeriods = async (periodType: GroupBy, dateRange: Interval) => {
    const { data, headers } = await this.http.get(
      `v1/statistics/periods?periodType=${periodType}&${intervalForQuery(
        dateRange,
      )}`,
      addTokenToHttpConfig(this.token, {}),
    );

    return {
      data: plainToClass(PeriodAmount, data),
      meta: this.getMeta(headers),
    };
  };

  private getMeta = (headers: any) => ({
    currency: headers['checkmoney-currency'] as Currency,
  });
}
