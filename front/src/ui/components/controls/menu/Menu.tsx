import { Menu as AntMenu } from 'antd'
import { ReactElement, useMemo, useCallback } from 'react'

import { MenuItemProps } from './MenuItemProps'
import { createOnClickMap } from './helpers/createOnClickMap'

interface Props {
  children: Array<ReactElement<MenuItemProps>>
  className?: string
}

export const Menu = ({ children, className }: Props) => {
  const selectedKeys: string[] = useMemo(
    () =>
      children
        .filter(({ props }) => props.selected)
        .filter(({ props }) => props.id)
        .map(({ props }) => props.id!),
    [children],
  )

  const onClickMap = useMemo(() => createOnClickMap(children), [children])

  const handleSelect = useCallback(
    ({ key }) => {
      const onClick = onClickMap[key]

      if (onClick) {
        onClick()
      }
    },
    [onClickMap],
  )

  return (
    <AntMenu
      className={className}
      mode="horizontal"
      selectedKeys={selectedKeys}
      onSelect={handleSelect}
    >
      {children.map(child => (
        <AntMenu.Item key={child.props.id}>{child}</AntMenu.Item>
      ))}
    </AntMenu>
  )
}
