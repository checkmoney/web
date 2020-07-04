import { useMemo } from 'react';

import { getFirstTransactionDate } from '&front/domain/money/selectors/getFirstTransactionDate';
import { createRangeForGroup } from '&front/helpers/createRangeForGroup';
import { PeriodType } from '&front/shared';
import { useMemoState } from '&front/domain/store';
import { fetchFirstTransactionDate } from '&front/domain/money/actions/fetchFirstTransactionDate';

export const useDateRange = (
  previousPeriodNumber: number,
  group?: PeriodType,
) => {
  const firstTransactionDate = useMemoState(
    () => getFirstTransactionDate,
    fetchFirstTransactionDate,
    [],
  );

  const { from, to } = useMemo(() => {
    if (group) {
      return createRangeForGroup(group, previousPeriodNumber);
    }

    return {
      from: firstTransactionDate,
      to: new Date(),
    };
  }, [group, previousPeriodNumber, firstTransactionDate]);

  return { from, to };
};
