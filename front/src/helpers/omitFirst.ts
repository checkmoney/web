import { head, omit } from 'lodash'

export const omitFirst = (obj: object) => {
  const firstKey = head(Object.keys(obj))

  if (!firstKey) {
    return obj
  }

  return omit(obj, [firstKey])
}
