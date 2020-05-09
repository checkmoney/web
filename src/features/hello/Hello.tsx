import React, { useCallback, useState } from 'react';
import { useMappedState } from 'redux-react-hook';

import { useThunk } from '&front/domain/store';
import { setDefaultCurrency } from '&front/domain/user/actions/setDefaultCurrency';
import { getDefaultCurrency } from '&front/domain/user/selectors/getDefaultCurrency';
import { pushRoute, useRoutePrefetching } from '&front/features/routing';
import { CurrencySwitch } from '&front/ui/components/controls/currency-switch';
import { Button } from '&front/ui/components/form/button';

import * as styles from './Hello.css';

export const Hello = () => {
  useRoutePrefetching(['/app']);

  const dispatch = useThunk();

  const defaultCurrency = useMappedState(getDefaultCurrency);
  const [currency, setCurrency] = useState(defaultCurrency);

  const next = useCallback(async () => {
    await dispatch(setDefaultCurrency(currency));
    pushRoute('/app');
  }, [currency]);

  return (
    <section className={styles.container}>
      <h1>
        Checkmoney Space
        <br />
        <small>Wellcome!</small>
        <section>
          <p className={styles.text}>Please, choose default currency</p>
          <CurrencySwitch currency={currency} updateCurrency={setCurrency} />
        </section>
      </h1>
      <Button onClick={next}>Start</Button>
    </section>
  );
};
