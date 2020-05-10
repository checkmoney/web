import { Table as AntTable } from 'antd';
import React, { useMemo, useCallback } from 'react';

import * as styles from './Table.css';
import { TableProps } from './TableProps';
import './AntTable.css?CSSModulesDisable';

export const Table = <Data extends Array<{}>>({
  className,
  data,
  columns,
  title,
  hideHeader = false,
  footer,
  onRowClick,
}: TableProps<Data>) => {
  const adoptedData = useMemo(
    () =>
      data.map((dataItem, key) => ({
        key,
        ...dataItem,
      })),
    [data],
  );

  const adoptedColumns = useMemo(
    () =>
      Object.entries(columns).map(([key, value]) => ({
        ...value,
        dataIndex: key,
        render: value.transform,
        width: value.widthPercent && `${value.widthPercent}%`,
      })),
    [columns],
  );

  const onRow = useCallback(
    (record) => ({
      onClick: () => onRowClick && onRowClick(record),
    }),
    [onRowClick],
  );

  return (
    <AntTable
      dataSource={adoptedData}
      columns={adoptedColumns}
      className={className}
      bordered
      size="middle"
      pagination={false}
      showHeader={!hideHeader}
      title={() => <div className={styles.title}>{title}</div>}
      footer={!!footer ? () => footer : undefined}
      onRow={onRow}
    />
  );
};
