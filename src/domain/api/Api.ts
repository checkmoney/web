import axios, { AxiosInstance } from 'axios';
import { Option } from 'tsoption';

import { $configuration } from '&front/application/configuration';

export class Api {
  public get client() {
    return this.axios;
  }

  private readonly axios: AxiosInstance;

  public constructor(token: Option<string>) {
    const authHeaders = token.nonEmpty()
      ? { Authorization: `Bearer ${token.get()}` }
      : {};

    this.axios = axios.create({
      baseURL: $configuration.getState().backUrl,
      headers: authHeaders,
    });
  }
}
