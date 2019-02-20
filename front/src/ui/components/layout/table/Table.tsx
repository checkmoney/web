import { Table as AntTable } from 'antd'
import { ReactNode, useMemo } from 'react'

interface Column {
  title: string
  transform?: (v: any) => ReactNode
}

interface Columns {
  [key: string]: Column
}

interface Props<Data extends Array<{}>> {
  data: Data
  columns: Columns
  className?: string
  title: string
}

export const Table = <Data extends Array<{}>>({
  className,
  data,
  columns,
  title,
}: Props<Data>) => {
  const adoptedData = useMemo(
    () =>
      data.map((dataItem, key) => ({
        key,
        ...dataItem,
      })),
    [data],
  )

  const adoptedColumns = useMemo(
    () =>
      Object.entries(columns).map(([key, value]) => ({
        ...value,
        dataIndex: key,
        render: value.transform,
      })),
    [columns],
  )

  return (
    <AntTable
      dataSource={adoptedData}
      columns={adoptedColumns}
      className={className}
      bordered
      size="middle"
      pagination={false}
      title={() => title}
    />
  )
}
