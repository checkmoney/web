import { setDate, format } from 'date-fns';
import React from 'react';

import { Card } from '&front/legacy_ui/components/layout/card';
import { formatMoney } from '&front/application/currency';
import { TipModel } from '&front/application/tips';

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
    start: format(startDate, 'DD.MM.YYYY'),
    end: format(endDate, 'DD.MM.YYYY'),
    outcome: formatMoney(currency, { withPenny: true })(amount),
  };

  return (
    <Card title="Предстоящая трата" extra={<DismissButton token={token} />}>
      В период с {start} по {end} вам предстоит трата {outcome} в категории
      &quot;{category}&quot;
    </Card>
  );
};
