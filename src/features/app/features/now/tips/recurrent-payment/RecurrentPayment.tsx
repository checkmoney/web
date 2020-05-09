import { setDate } from 'date-fns';
import React from 'react';

import { useTranslation } from '&front/domain/i18n';
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
  const { t } = useTranslation();

  const { amount, currency, period, category } = meta;

  const now = new Date();
  const startDate = setDate(now, period.from);
  const endDate = setDate(now, period.to);

  const context = {
    start: formatDate(startDate),
    end: formatDate(endDate),
    outcome: displayMoney(currency)(amount),
    category,
  };

  return (
    <Card
      title={t('tips:recurrent.title')}
      extra={<DismissButton token={token} />}
    >
      {t('tips:recurrent.content', context)}
    </Card>
  );
};
