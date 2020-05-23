import React from 'react';
import { useRouter } from 'react-router5';

import { Menu } from '&front/ui/components/controls/menu/Menu';
import { MenuItem } from '&front/ui/components/controls/menu/MenuItem';
import { Route } from '&front/app/router';
import { decodeToken, retrieveToken } from '&front/app/auth/auth.utils';

interface Props {
  className?: string;
}

export const Navigation = ({ className }: Props) => {
  const { isManager } = decodeToken(retrieveToken() || '');
  const { navigate } = useRouter();

  const defaultMenu = [
    <MenuItem id="home" key="home" selected>
      Сводка
    </MenuItem>,
    <MenuItem id="stats" key="stats" onClick={() => navigate(Route.Statistics)}>
      Статистика
    </MenuItem>,
    <MenuItem
      id="history"
      key="history"
      onClick={() => navigate(Route.History)}
    >
      История
    </MenuItem>,
    <MenuItem
      id="profile"
      key="profile"
      onClick={() => navigate(Route.Profile)}
    >
      Профиль
    </MenuItem>,
  ];

  const managerMenu = isManager
    ? [
        <MenuItem
          id="manager"
          key="manager"
          onClick={() => navigate(Route.Manager)}
        >
          Менеджерская
        </MenuItem>,
      ]
    : [];

  const menu = [...defaultMenu, ...managerMenu];

  return <Menu className={className}>{menu}</Menu>;
};
