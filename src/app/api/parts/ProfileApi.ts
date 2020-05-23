import Axios, { AxiosInstance } from 'axios';

import { Currency } from '&shared/enum/Currency';

import { addTokenToHttpConfig } from '../api.utils';

export class ProfileApi {
  private readonly http: AxiosInstance;

  constructor(url: string, private readonly token: string) {
    const serviceUrl = url;

    this.http = Axios.create({
      baseURL: serviceUrl,
    });
  }

  getCurrency = async (): Promise<Currency> => {
    const { data } = await this.http.get(
      `v1/default-currency`,
      addTokenToHttpConfig(this.token, {}),
    );

    return data;
  };
}
