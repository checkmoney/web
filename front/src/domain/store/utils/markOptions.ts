import { isObject, mapValues } from 'lodash'
import { Option } from 'tsoption'

import { OPTION_MARK } from './objectTaps/OPTION_MARK'

const mapValuesDeep = (obj: any, callback: (value: any) => any): any =>
  isObject(obj) && !isOption(obj)
    ? mapValues(obj, (value: any) => mapValuesDeep(value, callback))
    : callback(obj)

const isOption = (obj: any): boolean => obj instanceof Option

export const markOptions = (obj: any) =>
  mapValuesDeep(obj, (v: any) => {
    if (isOption(v)) {
      v[OPTION_MARK] = true
    }

    return v
  })
