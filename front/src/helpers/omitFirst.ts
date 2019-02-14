import { head, omitBy } from 'lodash'

export const omitFirst = (obj: object) => {
  const firstKey = head(Object.keys(obj))

  return omitBy(obj, key => key === firstKey)
}
