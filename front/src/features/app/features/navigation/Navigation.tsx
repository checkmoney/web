import React from 'react'
import { useMappedState } from 'redux-react-hook'

import { Menu } from '@front/ui/components/controls/menu/Menu'
import { MenuItem } from '@front/ui/components/controls/menu/MenuItem'
import { pushRoute } from '@front/features/routing'
import { getUserIsManager } from '@front/domain/user/selectors/getUserIsManager'
import { useTranslation } from '@front/domain/i18n'

interface Props {
  className?: string
}

export const Navigation = ({ className }: Props) => {
  const isManager = useMappedState(getUserIsManager)
  const { t } = useTranslation()

  const defaultMenu = [
    <MenuItem id="home" key="home" selected>
      {t('common:nav.home')}
    </MenuItem>,
    <MenuItem id="stats" key="stats" onClick={() => pushRoute('/app/stats')}>
      {t('common:nav.stats')}
    </MenuItem>,
    <MenuItem
      id="history"
      key="history"
      onClick={() => pushRoute('/app/history')}
    >
      {t('common:nav.history')}
    </MenuItem>,
    <MenuItem
      id="profile"
      key="profile"
      onClick={() => pushRoute('/app/profile')}
    >
      {t('common:nav.profile')}
    </MenuItem>,
  ]

  const managerMenu = isManager
    ? [
        <MenuItem
          id="manager"
          key="manager"
          onClick={() => pushRoute('/manager')}
        >
          {t('common:nav.manager')}
        </MenuItem>,
      ]
    : []

  const menu = [...defaultMenu, ...managerMenu]

  return <Menu className={className}>{menu}</Menu>
}
