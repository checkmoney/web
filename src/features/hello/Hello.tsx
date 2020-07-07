import React, { useCallback, useState } from 'react';
import { useRouter } from 'react-router5';

import { CurrencySwitch } from '&front/ui/components/controls/currency-switch';
import { Button } from '&front/presentation/atoms';
import { Currency, setCurrencyFx } from '&front/application/profile';
import { Route } from '&front/application/router';

import * as styles from './Hello.css';

export const Hello = () => {
  const { navigate } = useRouter();

  const [currency, setCurrency] = useState(Currency.USD);

  const next = useCallback(async () => {
    await setCurrencyFx(currency);
    navigate(Route.Dashboard);
  }, [currency]);

  return (
    <section className={styles.container}>
      <h1>
        Checkmoney
        <br />
        <small>Лучший мани трекер</small>
        <section>
          <p className={styles.text}>Нужно выбрать валюту по умолчанию</p>
          <CurrencySwitch currency={currency} updateCurrency={setCurrency} />
        </section>
      </h1>
      <Button mod="primary" onClick={next}>
        Поехали
      </Button>
    </section>
  );
};
