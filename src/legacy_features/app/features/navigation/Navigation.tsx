import React from 'react';
import { useRouter } from 'react-router5';
import { useStore } from 'effector-react';

import { Menu } from '&front/legacy_ui/components/controls/menu/Menu';
import { MenuItem } from '&front/legacy_ui/components/controls/menu/MenuItem';
import { Route } from '&front/application/router';
import { $viewer } from '&front/application/viewer';

interface Props {
  className?: string;
}

export const Navigation = ({ className }: Props) => {
  const { navigate } = useRouter();

  return (
    <Menu className={className}>
      <MenuItem id="home" selected>
        Сводка
      </MenuItem>
      <MenuItem
        id="stats"
        key="stats"
        onClick={() => navigate(Route.Statistics)}
      >
        Статистика
      </MenuItem>
      <MenuItem id="history" onClick={() => navigate(Route.History)}>
        История
      </MenuItem>
      <MenuItem id="profile" onClick={() => navigate(Route.Profile)}>
        Профиль
      </MenuItem>
    </Menu>
  );
};
