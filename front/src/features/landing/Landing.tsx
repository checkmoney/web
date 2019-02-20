import { useRoutePrefetching } from '../routing'
import { SignIn } from './features/sign-in'
import { SignUp } from './features/sign-up'

export const Landing = () => {
  useRoutePrefetching(['/hello', '/app'])

  return (
    <>
      <SignIn />
      <SignUp />
    </>
  )
}
