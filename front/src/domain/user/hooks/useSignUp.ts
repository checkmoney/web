import { useCallback } from 'react'
import { useDispatch } from 'redux-react-hook'

import { signUp } from '@front/domain/user/actions/signUp'

export const useSignUp = () => {
  const dispatch = useDispatch()

  return useCallback(
    (login: string, password: string): Promise<any> =>
      dispatch(signUp(login, password) as any),
    [],
  )
}
