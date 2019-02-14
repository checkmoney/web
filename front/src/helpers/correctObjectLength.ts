import { omit, take } from 'lodash'

interface DataObject<T> {
  [key: string]: T
}

export const correctObjectLength = <T>(
  data: DataObject<T>,
  max: number,
): DataObject<T> => {
  const keys = Object.keys(data)
  const diff = keys.length - max

  if (diff <= 0) {
    return data
  }

  const omitKeys = take(keys, diff)

  return omit(data, omitKeys)
}
