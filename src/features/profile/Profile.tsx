import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';

import { useThunk } from '&front/domain/store';
import { bindGoogle } from '&front/domain/user/actions/bindGoogle';
import { setDefaultCurrency } from '&front/domain/user/actions/setDefaultCurrency';
import { signOut } from '&front/domain/user/actions/signOut';
import { Google } from '&front/ui/auth-widget/google';
import { CurrencySwitch } from '&front/ui/components/controls/currency-switch';
import { Button } from '&front/ui/components/form/button';
import { Label } from '&front/ui/components/form/label';
import { Card } from '&front/ui/components/layout/card';
import { Container } from '&front/ui/components/layout/container';
import { PageHeader } from '&front/ui/components/layout/page-header';
import { useNotifyAlert } from '&front/ui/hooks/useNotifyAlert';
import { GoogleProfile } from '&shared/models/user/external/GoogleProfile';
import { actions as requireActions } from '&front/app/utility/require.actions';
import {
  selectDefaultCurrency,
  selectDefaultCurrencyIsAvailable,
} from '&front/app/profile/default_currency.selectors';
import { RequireType } from '&front/app/utility/require.types';

import { pushRoute } from '../routing';
import * as styles from './Profile.css';

export const Profile = () => {
  const dispatchThunk = useThunk();
  const dispatch = useDispatch();
  const notify = useNotifyAlert();

  useEffect(() => {
    dispatch(requireActions.dataRequired(RequireType.DefaultCurrency));
  }, []);

  const defaultCurrency = useMappedState(selectDefaultCurrency);
  const isReady = useMappedState(selectDefaultCurrencyIsAvailable);

  const [currency, setCurrency] = useState(defaultCurrency);

  useEffect(() => {
    setCurrency(defaultCurrency);
  }, [defaultCurrency]);

  const saved = useCallback(() => notify('Saved'), [notify]);
  const bound = useCallback(
    (social: string) => notify(`Аккаунт "${social}" прикреплен`),
    [notify],
  );

  const handleGoogleLogin = useCallback(async (profile: GoogleProfile) => {
    await dispatchThunk(bindGoogle(profile));
    bound('google');
  }, []);

  useEffect(() => {
    if (currency && currency !== defaultCurrency) {
      dispatchThunk(setDefaultCurrency(currency)).then(saved);
    }
  }, [currency, saved, defaultCurrency]);

  const logout = useCallback(async () => {
    dispatchThunk(signOut());
    await pushRoute('/');
  }, []);

  return (
    <Container>
      <PageHeader title="Профиль" onBack={() => pushRoute('/app')} />

      <section className={styles.container}>
        <Card title="Профиль">
          <Button onClick={logout}>Выйти</Button>
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
