import * as React from 'react';

import { AppContext } from '&front/domain/AppContext';
import { pageWithTranslation, Namespace } from '&front/domain/i18n';
import { Categories } from '&front/features/statistics/features/details/categories';
import { GroupBy } from '&shared/enum/GroupBy';

interface Query {
  group?: GroupBy;
}

class CateogiesPage extends React.Component<Query> {
  public static isSecure = true;

  public static async getInitialProps({ query }: AppContext<Query>) {
    const { group } = query;

    return { group };
  }

  public render() {
    const { group } = this.props;

    return <Categories group={group || GroupBy.Year} />;
  }
}

export default pageWithTranslation([Namespace.Stats, Namespace.Months])(
  CateogiesPage,
);
