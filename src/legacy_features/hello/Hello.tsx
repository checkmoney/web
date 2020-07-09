import React, { useCallback, useState } from 'react';
import { useRouter } from 'react-router5';

import { Button } from '&front/presentation/atoms';
import {
  Currency,
  setUserCurrencyFx,
  CurrencySelect,
} from '&front/application/currency';
import { Route } from '&front/application/router';

import * as styles from './Hello.css';

export const Hello = () => {
  const { navigate } = useRouter();

  const [currency, setCurrency] = useState(Currency.USD);

  const next = useCallback(async () => {
    await setUserCurrencyFx(currency);
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
          <CurrencySelect value={currency} onChange={setCurrency} />
        </section>
      </h1>
      <Button mod="primary" onClick={next}>
        Поехали
      </Button>
    </section>
  );
};
