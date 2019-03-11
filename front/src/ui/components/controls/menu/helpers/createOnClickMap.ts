import { ReactElement } from 'react'
import { MenuItemProps } from '../MenuItemProps'

type OnClickMap = {
  [key: string]: () => void
}

export const createOnClickMap = (
  children: Array<ReactElement<MenuItemProps>>,
): OnClickMap =>
  children.reduce(
    (acc, { props: { id, onClick } }) =>
      id
        ? {
            ...acc,
            [id]: onClick,
          }
        : acc,
    {},
  )
