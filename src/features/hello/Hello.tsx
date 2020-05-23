import React, { useCallback, useState } from 'react';

import { useThunk } from '&front/domain/store';
import { setDefaultCurrency } from '&front/domain/user/actions/setDefaultCurrency';
import { CurrencySwitch } from '&front/ui/components/controls/currency-switch';
import { Button } from '&front/ui/components/form/button';
import { Currency } from '&shared/enum/Currency';
import { Route } from '&front/app/router/router.types';
import { useBoundRouter } from '&front/app/router/router.utils';

import * as styles from './Hello.css';

export const Hello = () => {
  const dispatchThunk = useThunk();
  const { pushRoute } = useBoundRouter(Route.Dashboard);

  const [currency, setCurrency] = useState(Currency.USD);

  const next = useCallback(async () => {
    await dispatchThunk(setDefaultCurrency(currency));
    pushRoute();
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
      <Button onClick={next}>Поехали</Button>
    </section>
  );
};
