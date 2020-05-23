import axios, { AxiosInstance } from 'axios';
import { Option } from 'tsoption';

import { config } from '&front/app/config';

const { backUrl } = config;

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
      baseURL: backUrl,
      headers: authHeaders,
    });
  }
}
