import {
  flow,
  isArray,
  isPlainObject,
  isString,
  isUndefined,
  mapValues,
} from 'lodash';

import { ObjectTaper } from './objectTaps/ObjectTaper';
import { OptionTaper } from './objectTaps/OptionTaper';
import { tapDate } from './stringTaps/tapDate';

const STRING_TAPS = [tapDate];
const OBJECT_TAPERS: ObjectTaper[] = [new OptionTaper()];

export const actualizeStore = (data: any): any => {
  if (isArray(data)) {
    return data.map(actualizeStore);
  }

  if (isString(data)) {
    return flow(STRING_TAPS)(data);
  }

  if (isUndefined(data) || !isPlainObject(data)) {
    return data;
  }

  const supportedTapers = OBJECT_TAPERS.filter(taper => taper.supports(data));

  if (isPlainObject(data) && supportedTapers.length > 0) {
    return flow(supportedTapers.map(taper => (v: any) => taper.tap(v)))(data);
  }

  return mapValues(data, value => actualizeStore(value));
};
