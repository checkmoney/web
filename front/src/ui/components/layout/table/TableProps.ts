import { ReactNode } from 'react'

interface Column {
  title: string
  transform?: (v: any) => ReactNode
  widthPercent?: number
}

interface Columns {
  [key: string]: Column
}

export interface TableProps<Data extends Array<{}>> {
  data: Data
  columns: Columns
  className?: string
  title: string
  hideHeader?: boolean
  footer?: ReactNode
}
