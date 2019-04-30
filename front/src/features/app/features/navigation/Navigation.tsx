import { useMappedState } from 'redux-react-hook'

import { Menu } from '@front/ui/components/controls/menu/Menu'
import { MenuItem } from '@front/ui/components/controls/menu/MenuItem'
import { pushRoute } from '@front/features/routing'
import { getUserIsManager } from '@front/domain/user/selectors/getUserIsManager'
// import { useModalActions, useModalState } from '@front/features/modal'

interface Props {
  className?: string
}

export const Navigation = ({ className }: Props) => {
  const isManager = useMappedState(getUserIsManager)

  // const a = useModalActions('kfd')
  // const t = useModalState('kfd')
  // console.log(t)

  // return (
  //   <>
  //     <button onClick={a.open}>OPEN</button>
  //     <button onClick={a.close}>CLOSE</button>
  //   </>
  // )

  const defaultMenu = [
    <MenuItem id="home" selected>
      Home
    </MenuItem>,
    <MenuItem id="stats" onClick={() => pushRoute('/app/stats')}>
      Stats
    </MenuItem>,
    <MenuItem id="history" onClick={() => pushRoute('/app/history')}>
      History
    </MenuItem>,
    <MenuItem id="profile" onClick={() => pushRoute('/app/profile')}>
      Profile
    </MenuItem>,
  ]

  const managerMenu = isManager
    ? [
        <MenuItem id="manager" onClick={() => pushRoute('/manager')}>
          Manager
        </MenuItem>,
      ]
    : []

  const menu = [...defaultMenu, ...managerMenu]

  return <Menu className={className}>{menu}</Menu>
}
