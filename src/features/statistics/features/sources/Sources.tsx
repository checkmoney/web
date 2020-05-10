import { take } from 'lodash';
import React, { useMemo, useEffect } from 'react';
import { useDispatch } from 'redux-react-hook';
import { Option } from 'tsoption';

import { Interval } from '&front/api/types';
import { actions } from '&front/app/statistics/categories.actions';
import {
  selectCategories,
  selectCategoriesHasError,
} from '&front/app/statistics/categories.selectors';
import { useMemoMappedState } from '&front/domain/store/useMemoMappedState';
import { pushRoute } from '&front/features/routing';
import { createRangeForGroup } from '&front/helpers/createRangeForGroup';
import { Button, ButtonType } from '&front/ui/components/form/button';
import { LoaderTable } from '&front/ui/components/layout/loader-table';
import { Currency } from '&shared/enum/Currency';
import { GroupBy } from '&shared/enum/GroupBy';
import { displayMoney } from '&shared/helpers/displayMoney';

interface Props {
  className?: string;
  currency: Currency;
  group: GroupBy.Month | GroupBy.Year;
  widthPercent: number;
  maxLength: number;
}

export const Sources = ({
  className,
  currency,
  group,
  widthPercent,
  maxLength,
}: Props) => {
  const columns = useMemo(
    () => ({
      category: {
        title: 'Source',
        widthPercent,
      },
      amount: {
        title: 'Amount',
        transform: displayMoney(currency),
      },
    }),
    [currency, widthPercent],
  );

  const { from, to } = useMemo(() => createRangeForGroup(group), [group]);
  const dateRange = useMemo(() => new Interval(from, to), [from, to]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.started({ periodType: group, dateRange }));
  }, [group, dateRange]);

  const data = useMemoMappedState(selectCategories(group, dateRange), [
    group,
    dateRange,
  ]);
  const error = useMemoMappedState(selectCategoriesHasError(group, dateRange), [
    group,
    dateRange,
  ]);

  const preparedData = useMemo(
    () =>
      Option.of(data)
        .map((v) => v.earnings)
        .map((v) => take(v, maxLength)),
    [data, maxLength],
  );

  const errorState = error ? Option.of('Error') : Option.of<string>(null);

  return (
    <LoaderTable
      title="На что вы тратите деньги"
      columns={columns}
      data={preparedData}
      fetching={{ error: errorState, loading: preparedData.isEmpty() }}
      expectedRows={maxLength}
      className={className}
      hideHeader
      footer={
        <Button
          type={ButtonType.Text}
          onClick={() => pushRoute(`/app/stats/sources/${group}`)}
        >
          Подробнее
        </Button>
      }
    />
  );
};
