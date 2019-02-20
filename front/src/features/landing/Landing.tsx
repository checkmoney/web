import { useRoutePrefetching } from '../routing'
import { SignIn } from './features/sign-in'
import { SignUp } from './features/sign-up'
import * as styles from './Landing.css'

export const Landing = () => {
  useRoutePrefetching(['/hello', '/app'])

  return (
    <section className={styles.container}>
      <SignIn />
      <SignUp />
    </section>
  )
}
