import * as React from 'react';

import { AppContext } from '&front/domain/AppContext';
import { Sources } from '&front/features/statistics/features/details/sources';
import { GroupBy } from '&shared/enum/GroupBy';

interface Query {
  group?: GroupBy;
}

class SourcesPage extends React.Component<Query> {
  public static isSecure = true;

  public static async getInitialProps({ query }: AppContext<Query>) {
    const { group } = query;

    return { group };
  }

  public render() {
    const { group } = this.props;

    return <Sources group={group || GroupBy.Year} />;
  }
}

export default SourcesPage;
