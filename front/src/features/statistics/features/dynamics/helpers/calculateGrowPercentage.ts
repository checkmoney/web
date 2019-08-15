import { Option } from 'tsoption';

export const calculateGrowPercentage = (
  actual: Option<number>,
  average: Option<number>,
): Option<number> => {
  if (actual.nonEmpty() && average.nonEmpty()) {
    const actualValue = actual.get();
    const averageValue = average.get();

    if (actualValue === 0 || averageValue === 0) {
      return Option.of(null);
    }

    const decrease = actualValue - averageValue;
    return Option.of((decrease / averageValue) * 100);
  }

  return Option.of(null);
};
