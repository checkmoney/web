import { useEffect } from 'react'
import { useState } from 'react'

import { Container } from '@front/ui/components/layout/container'
import { PageHeader } from '@front/ui/components/layout/page-header'
import { CurrencySwitch } from '@front/ui/components/controls/currency-switch'
import { useMemoState, useThunk } from '@front/domain/store'
import { getProfile } from '@front/domain/user/selectors/getProfile'
import { fetchUserProfile } from '@front/domain/user/actions/fetchUserProfile'
import { Label } from '@front/ui/components/form/label'
import { setDefaultCurrency } from '@front/domain/user/actions/setDefaultCurrency'
import { Currency } from '@shared/enum/Currency'

import { pushRoute } from '../routing'

export const Profile = () => {
  const dispatch = useThunk()

  const profile = useMemoState(() => getProfile, fetchUserProfile, [])

  const [currency, setCurrency] = useState<Currency>(profile.defaultCurrency)

  useEffect(() => {
    if (currency !== profile.defaultCurrency) {
      dispatch(setDefaultCurrency(currency))
    }
  }, [currency])

  return (
    <Container>
      <PageHeader title="Profile" onBack={() => pushRoute('/app')} />

      <section>
        <p>jhon@snow.bastard</p>

        <Label text="Preferred currency">
          <CurrencySwitch currency={currency} updateCurrency={setCurrency} />
        </Label>
      </section>
    </Container>
  )
}
