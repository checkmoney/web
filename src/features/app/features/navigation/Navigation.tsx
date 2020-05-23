import React from 'react';

import { Menu } from '&front/ui/components/controls/menu/Menu';
import { MenuItem } from '&front/ui/components/controls/menu/MenuItem';
import { useRouter } from '&front/app/router/router.utils';
import { Route } from '&front/app/router/router.types';
import { decodeToken, retrieveToken } from '&front/app/auth/auth.utils';

interface Props {
  className?: string;
}

export const Navigation = ({ className }: Props) => {
  const { isManager } = decodeToken(retrieveToken() || '');
  const { pushRoute } = useRouter();

  const defaultMenu = [
    <MenuItem id="home" key="home" selected>
      Сводка
    </MenuItem>,
    <MenuItem
      id="stats"
      key="stats"
      onClick={() => pushRoute(Route.Statistics)}
    >
      Статистика
    </MenuItem>,
    <MenuItem
      id="history"
      key="history"
      onClick={() => pushRoute(Route.History)}
    >
      История
    </MenuItem>,
    <MenuItem
      id="profile"
      key="profile"
      onClick={() => pushRoute(Route.Profile)}
    >
      Профиль
    </MenuItem>,
  ];

  const managerMenu = isManager
    ? [
        <MenuItem
          id="manager"
          key="manager"
          onClick={() => pushRoute(Route.Manager)}
        >
          Менеджерская
        </MenuItem>,
      ]
    : [];

  const menu = [...defaultMenu, ...managerMenu];

  return <Menu className={className}>{menu}</Menu>;
};
