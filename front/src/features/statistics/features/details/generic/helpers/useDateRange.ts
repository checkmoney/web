import { useMemo } from 'react';
import { useMappedState } from 'redux-react-hook';

import { getFirstTransactionDate } from '&front/domain/money/selectors/getFirstTransactionDate';
import { createRangeForGroup } from '&front/helpers/createRangeForGroup';
import { GroupBy } from '&shared/enum/GroupBy';

export const useDateRange = (previousPeriodNumber: number, group?: GroupBy) => {
  const firstTransactionDate = useMappedState(getFirstTransactionDate);

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
