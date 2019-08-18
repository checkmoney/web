import axios, { AxiosInstance } from 'axios';
import getConfig from 'next/config';
import { Option } from 'tsoption';

const { publicRuntimeConfig } = getConfig();
const { backUrl } = publicRuntimeConfig;

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
