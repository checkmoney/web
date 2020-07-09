import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import useMedia from 'use-media';

import { colorHash } from '&front/shared';

import { PieChartProps } from './pie_chart.types';
import { createOptions } from './pie_chart.utils';

export const PieChart = <T extends Record<string, any>>({
  data,
  nameKey,
  valueKey,
  valueToString,
}: PieChartProps<T>) => {
  const isSmall = useMedia({ maxWidth: 768 });

  const preparedData = useMemo(
    () => ({
      labels: data.map((set) => set[nameKey].toString()),
      datasets: [
        {
          data: data.map((set) => Number(set[valueKey])),
          backgroundColor: data.map((set) => colorHash(set[nameKey])),
          borderWidth: 0,
        },
      ],
    }),
    [data, nameKey, valueKey],
  );

  const options = useMemo(() => createOptions(valueToString, !isSmall), [
    valueToString,
    isSmall,
  ]);

  return <Pie data={preparedData} options={options} />;
};
