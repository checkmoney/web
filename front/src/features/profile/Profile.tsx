import React, { useEffect, useState, useCallback } from 'react';

import { useTranslation } from '&front/domain/i18n';
import { useMemoState, useThunk } from '&front/domain/store';
import { bindGoogle } from '&front/domain/user/actions/bindGoogle';
import { fetchUserProfile } from '&front/domain/user/actions/fetchUserProfile';
import { setDefaultCurrency } from '&front/domain/user/actions/setDefaultCurrency';
import { setWeekStart } from '&front/domain/user/actions/setWeekStart';
import { signOut } from '&front/domain/user/actions/signOut';
import { getProfile } from '&front/domain/user/selectors/getProfile';
import { Google } from '&front/ui/auth-widget/google';
import { CurrencySwitch } from '&front/ui/components/controls/currency-switch';
import { Button } from '&front/ui/components/form/button';
import { Checkbox } from '&front/ui/components/form/checkbox';
import { Label } from '&front/ui/components/form/label';
import { Card } from '&front/ui/components/layout/card';
import { Container } from '&front/ui/components/layout/container';
import { PageHeader } from '&front/ui/components/layout/page-header';
import { useNotifyAlert } from '&front/ui/hooks/useNotifyAlert';
import { Currency } from '&shared/enum/Currency';
import { GoogleProfile } from '&shared/models/user/external/GoogleProfile';

import { pushRoute } from '../routing';
import * as styles from './Profile.css';

export const Profile = () => {
  const dispatch = useThunk();
  const notify = useNotifyAlert();
  const { t } = useTranslation();

  const { defaultCurrency, weekStartsOnMonday } = useMemoState(
    () => getProfile,
    fetchUserProfile,
    [],
  );

  const [currency, setCurrency] = useState<Currency>(defaultCurrency);
  const [onMonday, setOnMonday] = useState(weekStartsOnMonday);

  const saved = useCallback(() => notify('Saved'), [notify]);
  const bound = useCallback(
    (social: string) => notify(`Аккаунт "${social}" прикреплен`),
    [notify],
  );

  const handleGoogleLogin = useCallback(async (profile: GoogleProfile) => {
    await dispatch(bindGoogle(profile));
    bound('google');
  }, []);

  useEffect(() => {
    if (currency !== defaultCurrency) {
      dispatch(setDefaultCurrency(currency)).then(saved);
    }
  }, [currency, saved, defaultCurrency]);

  useEffect(() => {
    if (onMonday !== weekStartsOnMonday) {
      dispatch(setWeekStart(onMonday)).then(saved);
    }
  }, [onMonday, saved, weekStartsOnMonday]);

  const logout = useCallback(async () => {
    dispatch(signOut());
    await pushRoute('/');
  }, []);

  return (
    <Container>
      <PageHeader
        title={t('common:nav.profile')}
        onBack={() => pushRoute('/app')}
      />

      <section className={styles.container}>
        <Card title={t('profile:main.title')}>
          <p>{t('profile:main.soon')}</p>
          <Button onClick={logout}>{t('profile:main.sign-out')}</Button>
        </Card>

        <Card title={t('profile:settings.title')}>
          <Label text={t('profile:settings.preferred-currency')}>
            <CurrencySwitch currency={currency} updateCurrency={setCurrency} />
          </Label>

          <Label text={t('profile:settings.week-starts-on-monday')}>
            <Checkbox value={onMonday} onChange={v => setOnMonday(!!v)} />
          </Label>
        </Card>

        <Card title="Logins">
          <Google onLogin={handleGoogleLogin} />
        </Card>
      </section>
    </Container>
  );
};
