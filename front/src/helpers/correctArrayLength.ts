import { drop } from 'lodash'

export const correctArrayLength = <T>(arr: T[], max: number): T[] => {
  const diff = arr.length - max

  if (diff <= 0) {
    return arr
  }

  return drop(arr, diff)
}
