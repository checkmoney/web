import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'

import { Container } from '@front/ui/components/layout/container'
import { PageHeader } from '@front/ui/components/layout/page-header'
import { CurrencySwitch } from '@front/ui/components/controls/currency-switch'
import { useMemoState, useThunk } from '@front/domain/store'
import { getProfile } from '@front/domain/user/selectors/getProfile'
import { fetchUserProfile } from '@front/domain/user/actions/fetchUserProfile'
import { Label } from '@front/ui/components/form/label'
import { setDefaultCurrency } from '@front/domain/user/actions/setDefaultCurrency'
import { Card } from '@front/ui/components/layout/card'
import { useNotifyAlert } from '@front/ui/hooks/useNotifyAlert'
import { Currency } from '@shared/enum/Currency'
import { Button } from '@front/ui/components/form/button'
import { signOut } from '@front/domain/user/actions/signOut'
import { useTranslation } from '@front/domain/i18n'

import { pushRoute } from '../routing'
import * as styles from './Profile.css'

export const Profile = () => {
  const dispatch = useThunk()
  const notify = useNotifyAlert()
  const { t } = useTranslation()

  const { defaultCurrency } = useMemoState(
    () => getProfile,
    fetchUserProfile,
    [],
  )

  const [currency, setCurrency] = useState<Currency>(defaultCurrency)

  useEffect(() => {
    if (currency !== defaultCurrency) {
      dispatch(setDefaultCurrency(currency)).then(() => notify('Saved'))
    }
  }, [currency])

  const logout = useCallback(async () => {
    dispatch(signOut())
    await pushRoute('/')
  }, [dispatch])

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
        </Card>
      </section>
    </Container>
  )
}
