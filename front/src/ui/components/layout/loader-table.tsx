import React from 'react'
import { Option } from 'tsoption'
import { FetchingState } from 'redux-clear'
import { Omit } from 'utility-types'

import { Table, TableProps } from './table'
import { Card } from './card'
import { Skeleton } from '../controls/skeleton/Skeleton'

interface OwnProps<Data extends Array<{}>> {
  fetching: FetchingState
  data: Option<TableProps<Data>['data']>
  expectedRows: number
}

type Props<Data extends Array<{}>> = OwnProps<Data> &
  Omit<TableProps<Data>, 'data'>

export const LoaderTable = <Data extends Array<{}>>({
  fetching,
  data,
  expectedRows,
  ...rest
}: Props<Data>) => {
  if (fetching.loading || data.isEmpty()) {
    return (
      <Card title={rest.title}>
        <Skeleton rows={expectedRows} />
      </Card>
    )
  }

  if (data.nonEmpty() && !fetching.loading) {
    return <Table data={data.get()} {...rest} />
  }

  return null
}
