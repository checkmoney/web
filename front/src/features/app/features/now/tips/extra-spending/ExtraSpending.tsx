import React from 'react';

import { TipModel } from '&shared/models/mind/TipModel';
import { displayMoney } from '&shared/helpers/displayMoney';
import { Card } from '&front/ui/components/layout/card';
import { useTranslation } from '&front/domain/i18n';

import { ExtraSpendingMeta } from './ExtraSpendingMeta';
import { DismissButton } from '../components/dismiss-button';

interface Props {
  tip: TipModel<ExtraSpendingMeta>;
}

export const ExtraSpending = ({ tip: { token, meta } }: Props) => {
  const { t } = useTranslation();

  const overrun = displayMoney(meta.currency)(meta.difference, {
    withPenny: false,
  });

  return (
    <Card title={t('tips:extra.title')} extra={<DismissButton token={token} />}>
      {t('tips:extra.content', { overrun })}
    </Card>
  );
};
