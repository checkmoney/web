import { useCallback } from 'react'
import { useDispatch } from 'redux-react-hook'

import { signIn } from '@front/domain/user/actions/signIn'

export const useSignIn = () => {
  const dispatch = useDispatch()

  return useCallback(
    (login: string, password: string): Promise<any> =>
      dispatch(signIn(login, password) as any),
    [],
  )
}
