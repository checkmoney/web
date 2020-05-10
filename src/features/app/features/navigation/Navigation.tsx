import React from 'react';
import { useMappedState } from 'redux-react-hook';

import { getUserIsManager } from '&front/domain/user/selectors/getUserIsManager';
import { pushRoute } from '&front/features/routing';
import { Menu } from '&front/ui/components/controls/menu/Menu';
import { MenuItem } from '&front/ui/components/controls/menu/MenuItem';

interface Props {
  className?: string;
}

export const Navigation = ({ className }: Props) => {
  const isManager = useMappedState(getUserIsManager);

  const defaultMenu = [
    <MenuItem id="home" key="home" selected>
      Сводка
    </MenuItem>,
    <MenuItem id="stats" key="stats" onClick={() => pushRoute('/app/stats')}>
      Статистика
    </MenuItem>,
    <MenuItem
      id="history"
      key="history"
      onClick={() => pushRoute('/app/history')}
    >
      История
    </MenuItem>,
    <MenuItem
      id="profile"
      key="profile"
      onClick={() => pushRoute('/app/profile')}
    >
      Профиль
    </MenuItem>,
  ];

  const managerMenu = isManager
    ? [
        <MenuItem
          id="manager"
          key="manager"
          onClick={() => pushRoute('/manager')}
        >
          Менеджерская
        </MenuItem>,
      ]
    : [];

  const menu = [...defaultMenu, ...managerMenu];

  return <Menu className={className}>{menu}</Menu>;
};
