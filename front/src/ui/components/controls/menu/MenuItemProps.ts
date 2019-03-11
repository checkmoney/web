import { ReactNode } from 'react'

export interface MenuItemProps {
  children: ReactNode
  onClick?: () => void
  id?: string
  selected?: boolean
}
