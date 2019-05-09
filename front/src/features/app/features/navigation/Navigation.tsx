import { useMappedState } from 'redux-react-hook'

import { Menu } from '@front/ui/components/controls/menu/Menu'
import { MenuItem } from '@front/ui/components/controls/menu/MenuItem'
import { pushRoute } from '@front/features/routing'
import { getUserIsManager } from '@front/domain/user/selectors/getUserIsManager'

interface Props {
  className?: string
}

export const Navigation = ({ className }: Props) => {
  const isManager = useMappedState(getUserIsManager)

  const defaultMenu = [
    <MenuItem id="home" key="home" selected>
      Home
    </MenuItem>,
    <MenuItem id="stats" key="stats" onClick={() => pushRoute('/app/stats')}>
      Stats
    </MenuItem>,
    <MenuItem
      id="history"
      key="history"
      onClick={() => pushRoute('/app/history')}
    >
      History
    </MenuItem>,
    <MenuItem
      id="profile"
      key="profile"
      onClick={() => pushRoute('/app/profile')}
    >
      Profile
    </MenuItem>,
  ]

  const managerMenu = isManager
    ? [
        <MenuItem
          id="manager"
          key="manager"
          onClick={() => pushRoute('/manager')}
        >
          Manager
        </MenuItem>,
      ]
    : []

  const menu = [...defaultMenu, ...managerMenu]

  return <Menu className={className}>{menu}</Menu>
}
