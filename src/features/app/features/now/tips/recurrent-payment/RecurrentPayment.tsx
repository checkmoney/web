import { setDate } from 'date-fns';
import React from 'react';

import { Card } from '&front/ui/components/layout/card';
import { displayMoney } from '&shared/helpers/displayMoney';
import { formatDate } from '&shared/helpers/formatDate';
import { TipModel } from '&shared/models/mind/TipModel';

import { DismissButton } from '../components/dismiss-button';
import { RecurrentPaymentMeta } from './RecurrentPaymentMeta';

interface Props {
  tip: TipModel<RecurrentPaymentMeta>;
}

export const RecurrentPayment = ({ tip: { meta, token } }: Props) => {
  const { amount, currency, period, category } = meta;

  const now = new Date();
  const startDate = setDate(now, period.from);
  const endDate = setDate(now, period.to);

  const { start, end, outcome } = {
    start: formatDate(startDate),
    end: formatDate(endDate),
    outcome: displayMoney(currency)(amount),
  };

  return (
    <Card title="Предстоящая трата" extra={<DismissButton token={token} />}>
      В период с {start} по {end} вам предстоит трата {outcome} в категории
      &quot;{category}&quot;
    </Card>
  );
};
