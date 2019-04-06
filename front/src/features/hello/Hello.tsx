import { pushRoute, useRoutePrefetching } from '@front/features/routing'
import { Button } from '@front/ui/components/form/button'

import * as styles from './Hello.css'

export const Hello = () => {
  useRoutePrefetching(['/app'])
  // const dispatch = useThunk()

  // const setCurrency = useCallback(async ({ currency }) => {
  //   console.log('button:', currency)
  //   await dispatch(setCurrencyAction(currency))
  // }, [])
  // тут нужно спросить о currency но я так и не поняла по какому роуту находится эта страница

  return (
    <section className={styles.container}>
      <h1>
        Checkmoney Space
        <br />
        <small>Wellcome!</small>
      </h1>
      <Button onClick={() => pushRoute('/app')}>Start</Button>
    </section>
  )
}
