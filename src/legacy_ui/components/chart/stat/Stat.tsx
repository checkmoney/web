import { Statistic, Icon } from 'antd';
import React from 'react';

interface Props {
  title: string;
  value?: number | null;
  suffix?: string;
  decreaseIsGood?: boolean;
}

export const Stat = ({
  title,
  value,
  suffix,
  decreaseIsGood = false,
}: Props) => {
  if (value != null) {
    const positive = value > 0;

    const green = !decreaseIsGood ? positive : !positive;

    const color = green ? '#3f8600' : '#cf1322';
    const iconType = positive ? 'arrow-up' : 'arrow-down';

    return (
      <Statistic
        title={title}
        value={Math.abs(value)}
        precision={2}
        valueStyle={{ color }}
        prefix={<Icon type={iconType} />}
        suffix={suffix}
      />
    );
  }

  return (
    <Statistic
      title={`${title}, нет данных`}
      value={0}
      precision={2}
      suffix={suffix}
    />
  );
};
