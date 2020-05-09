import Axios, { AxiosInstance } from 'axios';
import { plainToClass } from 'class-transformer';

import { PeriodCategories } from '&front/app/statistics/categories.types';
import { Grow } from '&front/app/statistics/grow.types';
import { PeriodAmount } from '&front/app/statistics/periods.types';
import { GroupBy } from '&shared/enum/GroupBy';

import { Interval } from './types';
import { addTokenToHttpConfig, intervalForQuery } from './utils';

export class StatisticsApi {
  private readonly http: AxiosInstance;

  constructor(url: string, private readonly token: string) {
    const serviceUrl = url;

    this.http = Axios.create({
      baseURL: serviceUrl,
    });
  }

  findGrow = async (periodType: GroupBy): Promise<Grow> => {
    const { data } = await this.http.get(
      `v1/statistics/grow?periodType=${periodType}`,
      addTokenToHttpConfig(this.token, {}),
    );

    return plainToClass(Grow, data);
  };

  fetchCategories = async (
    periodType: GroupBy,
    dateRange: Interval,
  ): Promise<PeriodCategories[]> => {
    const { data } = await this.http.get(
      `v1/statistics/categories?periodType=${periodType}&${intervalForQuery(
        dateRange,
      )}`,
      addTokenToHttpConfig(this.token, {}),
    );

    return plainToClass(PeriodCategories, data);
  };

  fetchPeriods = async (
    periodType: GroupBy,
    dateRange: Interval,
  ): Promise<PeriodAmount[]> => {
    const { data } = await this.http.get(
      `v1/statistics/periods?periodType=${periodType}&${intervalForQuery(
        dateRange,
      )}`,
      addTokenToHttpConfig(this.token, {}),
    );

    return plainToClass(PeriodAmount, data);
  };
}
