import { Option } from 'tsoption';

import { Api } from './Api';

export const createApi = (token: Option<string>) => new Api(token);
