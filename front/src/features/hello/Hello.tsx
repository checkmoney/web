import { pushRoute, useRoutePrefetching } from '@front/features/routing'
import { Button } from '@front/ui/components/form/button'
import { useThunk } from '@front/domain/store'
import { useCallback } from 'react'

import * as styles from './Hello.css'
import { setDefaultCurrency } from '@front/domain/user/actions/setDefaultCurrency'
import { Currency } from '@shared/enum/Currency'

export const Hello = () => {
  useRoutePrefetching(['/app'])
  const dispatch = useThunk()

  const setCurrency = useCallback(async currency => {
    await dispatch(setDefaultCurrency(currency))
  }, [])

  return (
    <section className={styles.container}>
      <h1>
        Checkmoney Space
        <br />
        <button onClick={() => setCurrency(Currency.RUB)}>
          set your currency
        </button>
        <small>Wellcome!</small>
      </h1>
      <Button onClick={() => pushRoute('/app')}>Start</Button>
    </section>
  )
}
