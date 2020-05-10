import React, { useCallback } from 'react';

import { mergeTypos } from '&front/domain/mind/actions/mergeTypos';
import { useThunk } from '&front/domain/store';
import { Button, ButtonType } from '&front/ui/components/form/button';
import { Card } from '&front/ui/components/layout/card';

import { DismissButton } from './dismiss-button';

interface Props {
  token: string;
  variants: string[];
}

export const Merge = ({ token, variants }: Props) => {
  const dispatch = useThunk();

  const createOnMerge = useCallback(
    (mainVariant: string) => {
      const merge = {
        primary: mainVariant,
        secondary: variants.filter((varinat) => varinat !== mainVariant),
      };

      return () => dispatch(mergeTypos(token, merge));
    },
    [variants, token],
  );

  if (!Array.isArray(variants)) {
    return null;
  }

  return (
    <Card
      title="Возможная опечатка"
      extra={<DismissButton token={token} />}
      actions={variants.map((variant) => (
        <Button
          type={ButtonType.Text}
          key={variant}
          onClick={createOnMerge(variant)}
        >
          {variant}
        </Button>
      ))}
    >
      Мы нашли несколько транзакций, похоже в некоторых из них допущена
      опечатка. Пожалуйста, выберите правильный вариант или закройте этот совет.
    </Card>
  );
};
