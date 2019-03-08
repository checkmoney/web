export const createAverageReducer = () =>
  ((sum: number, count: number) => (_: number, amount: number) => {
    // eslint-disable-next-line no-param-reassign
    sum += amount

    // eslint-disable-next-line no-param-reassign
    count++

    return sum / count
  })(0, 0)
