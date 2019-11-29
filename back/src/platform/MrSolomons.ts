import { Injectable } from '@nestjs/common';
import Axios, { AxiosInstance } from 'axios';
import { format } from 'date-fns';
import { stringify } from 'querystring';

import { Configuration } from '&back/config/Configuration';

interface MrSolomonsResponse {
  result: string;
}

@Injectable()
export class MrSolomons {
  private readonly http: AxiosInstance;

  constructor(config: Configuration) {
    const serviceUrl = config.getStringOrThrow('MR_SOLOMONS_URL');

    this.http = Axios.create({
      baseURL: serviceUrl,
    });
  }

  async convert(
    amount: string,
    from: string,
    to: string,
    date: Date,
  ): Promise<string> {
    if (from === to) {
      return amount;
    }

    const query = stringify({
      amount,
      from,
      to,
      date: format(date, 'YYYY-MM-DD'),
    });

    const response = await this.http.get<MrSolomonsResponse>(
      `/v1/convert?${query}`,
    );

    return response.data.result;
  }
}
