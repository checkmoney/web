import React from 'react';
import { FetchingState } from 'redux-clear';
import { Option } from 'tsoption';
import { Omit } from 'utility-types';

import { Skeleton } from '../controls/skeleton/Skeleton';
import { Card } from './card';
import { Table, TableProps } from './table';

interface OwnProps<Data extends Array<{}>> {
  fetching: FetchingState;
  data: Option<TableProps<Data>['data']>;
  expectedRows: number;
}

type Props<Data extends Array<{}>> = OwnProps<Data> &
  Omit<TableProps<Data>, 'data'>;

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
    );
  }

  if (data.nonEmpty() && !fetching.loading) {
    return <Table data={data.get()} {...rest} />;
  }

  return null;
};
