import { Option } from 'tsoption'

import { Api } from '../api'

export type ExtraArg = (token: Option<string>) => Api
