import React from 'react';
import { useRouter } from 'react-router5';
import { useStore } from 'effector-react';

import { Menu } from '&front/ui/components/controls/menu/Menu';
import { MenuItem } from '&front/ui/components/controls/menu/MenuItem';
import { Route } from '&front/application/router';
import { $viewer } from '&front/application/viewer';

interface Props {
  className?: string;
}

export const Navigation = ({ className }: Props) => {
  const { isManager } = useStore($viewer);
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
