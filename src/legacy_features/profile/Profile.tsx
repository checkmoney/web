import { useStore, useGate } from 'effector-react';
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'react-router5';

import { Button, Label } from '&front/presentation/atoms';
import { Card } from '&front/legacy_ui/components/layout/card';
import { Container } from '&front/legacy_ui/components/layout/container';
import { PageHeader } from '&front/legacy_ui/components/layout/page-header';
import { Route } from '&front/application/router';
import {
  $currency,
  setUserCurrencyFx,
  CurrencyGate,
  CurrencySelect,
} from '&front/application/currency';
import {
  loggedOut,
  bindGoogleFx,
  GoogleWidget,
} from '&front/application/login';
import { somethingHappened } from '&front/application/notify';

import * as styles from './Profile.css';

export const Profile = () => {
  useGate(CurrencyGate);
  const defaultCurrency = useStore($currency);

  const { navigate } = useRouter();

  const isReady = defaultCurrency;

  const [currency, setCurrency] = useState(defaultCurrency);

  useEffect(() => {
    setCurrency(defaultCurrency);
  }, [defaultCurrency]);

  const saved = useCallback(() => somethingHappened('Saved'), []);
  const boundGoogle = useCallback(
    () => somethingHappened(`Google-аккаунт прикреплен`),
    [],
  );

  useEffect(() => {
    if (currency && currency !== defaultCurrency) {
      setUserCurrencyFx(currency).then(saved);
    }
  }, [currency, saved, defaultCurrency]);

  const logout = useCallback(() => {
    loggedOut();
  }, []);

  return (
    <Container>
      <PageHeader title="Профиль" onBack={() => navigate(Route.Dashboard)} />

      <section className={styles.container}>
        <Card title="Профиль">
          <Button mod="primary" onClick={logout}>
            Выйти
          </Button>
        </Card>

        <Card title="Настройки">
          <Label text="Валюта по умолчанию">
            {!isReady && 'Loading...'}
            {isReady && (
              <CurrencySelect value={currency!} onChange={setCurrency} />
            )}
          </Label>
        </Card>

        <Card title="Logins">
          <GoogleWidget handleLogin={bindGoogleFx} onSuccess={boundGoogle} />
        </Card>
      </section>
    </Container>
  );
};
