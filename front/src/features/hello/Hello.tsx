import { pushRoute } from '@front/features/routing'
import { Button } from '@front/ui/components/form/button'

import * as styles from './Hello.css'

export const Hello = () => {
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
