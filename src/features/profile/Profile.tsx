import { useStore } from 'effector-react';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'react-router5';

import { Google } from '&front/ui/auth-widget/google';
import { CurrencySwitch } from '&front/ui/components/controls/currency-switch';
import { Button } from '&front/presentation/atoms/button';
import { Label } from '&front/ui/components/form/label';
import { Card } from '&front/ui/components/layout/card';
import { Container } from '&front/ui/components/layout/container';
import { PageHeader } from '&front/ui/components/layout/page-header';
import { actions as requireActions } from '&front/app/utility/required.actions';
import { RequireType } from '&front/app/utility/required.types';
import { Route } from '&front/application/router';
import { $currency, setCurrencyFx } from '&front/application/profile';
import {
  loggedOut,
  bindGoogleFx,
  GoogleProfile,
} from '&front/application/login';
import { somethingHappened } from '&front/application/notify';

import * as styles from './Profile.css';

export const Profile = () => {
  const dispatch = useDispatch();
  const { navigate } = useRouter();

  useEffect(() => {
    dispatch(requireActions.dataRequired(RequireType.DefaultCurrency));
  }, []);

  const { data: defaultCurrency, isReady } = useStore($currency);

  const [currency, setCurrency] = useState(defaultCurrency);

  useEffect(() => {
    setCurrency(defaultCurrency);
  }, [defaultCurrency]);

  const saved = useCallback(() => somethingHappened('Saved'), []);
  const bound = useCallback(
    (social: string) => somethingHappened(`Аккаунт "${social}" прикреплен`),
    [],
  );

  const handleGoogleLogin = useCallback(async (profile: GoogleProfile) => {
    await bindGoogleFx(profile);
    bound('google');
  }, []);

  useEffect(() => {
    if (currency && currency !== defaultCurrency) {
      setCurrencyFx(currency).then(saved);
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
              <CurrencySwitch
                currency={currency!}
                updateCurrency={setCurrency}
              />
            )}
          </Label>
        </Card>

        <Card title="Logins">
          <Google onLogin={handleGoogleLogin} />
        </Card>
      </section>
    </Container>
  );
};
