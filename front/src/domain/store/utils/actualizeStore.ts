import {
  flow,
  isArray,
  isPlainObject,
  isString,
  isUndefined,
  mapValues,
} from 'lodash'

import { tapDate } from './taps/tapDate'

const TAPS = [tapDate]

const actualizeStore = (data: any): any => {
  if (isArray(data)) {
    return data.map(actualizeStore)
  }

  if (isString(data)) {
    return flow(TAPS)(data)
  }

  if (isUndefined(data) || !isPlainObject(data)) {
    return data
  }

  return mapValues(data, value => actualizeStore(value))
}

export default actualizeStore
