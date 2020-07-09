import { Menu as AntMenu } from 'antd';
import React, { ReactElement, useMemo, useCallback } from 'react';

import { createOnClickMap } from './helpers/createOnClickMap';
import { MenuItemProps } from './MenuItemProps';

interface Props {
  children: Array<ReactElement<MenuItemProps>>;
  className?: string;
}

export const Menu = ({ children, className }: Props) => {
  const selectedKeys = useMemo(
    () =>
      children
        .filter(({ props }) => props.selected)
        .filter(({ props }) => props.id)
        .map(({ props }) => props.id!),
    [children],
  );

  const onClickMap = useMemo(() => createOnClickMap(children), [children]);

  const handleSelect = useCallback(
    ({ key }) => {
      const onClick = onClickMap[key];

      if (onClick) {
        onClick();
      }
    },
    [onClickMap],
  );

  // Ant not define this props in types, but accept
  const additionalProps: any = {
    overflowedIndicator: 'Еще',
  };

  return (
    <AntMenu
      className={className}
      mode="horizontal"
      selectedKeys={selectedKeys}
      onSelect={handleSelect}
      {...additionalProps}
    >
      {children.map((child) => (
        <AntMenu.Item key={child.props.id}>{child}</AntMenu.Item>
      ))}
    </AntMenu>
  );
};
