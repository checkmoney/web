import { Menu } from '@front/ui/components/controls/menu/Menu'
import { MenuItem } from '@front/ui/components/controls/menu/MenuItem'
import { pushRoute } from '@front/features/routing'

interface Props {
  className?: string
}

export const Navigation = ({ className }: Props) => (
  <Menu className={className}>
    <MenuItem id="home" selected>
      Home
    </MenuItem>
    <MenuItem id="stats" onClick={() => pushRoute('/app/stats')}>
      Stats
    </MenuItem>
    <MenuItem id="history" onClick={() => pushRoute('/app/history')}>
      History
    </MenuItem>
    <MenuItem id="profile" onClick={() => pushRoute('/app/profile')}>
      Profile
    </MenuItem>
  </Menu>
)
