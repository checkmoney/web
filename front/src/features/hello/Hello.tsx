import { pushRoute } from '@front/pushRoute'
import { Button } from '@front/ui/atoms/button'

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
