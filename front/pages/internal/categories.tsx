import * as React from 'react';

import { AppContext } from '&front/domain/AppContext';
import { pageWithTranslation, Namespace } from '&front/domain/i18n';
import { fetchFirstTransactionDate } from '&front/domain/money/actions/fetchFirstTransactionDate';
import { fetchStatsCategories } from '&front/domain/money/actions/fetchStatsCategories';
import { getFirstTransactionDate } from '&front/domain/money/selectors/getFirstTransactionDate';
import { getDefaultCurrency } from '&front/domain/user/selectors/getDefaultCurrency';
import { Categories } from '&front/features/statistics/features/details/categories';
import { createRangeForGroup } from '&front/helpers/createRangeForGroup';
import { GroupBy } from '&shared/enum/GroupBy';

interface Query {
  group?: GroupBy;
}

class CateogiesPage extends React.Component<Query> {
  public static isSecure = true;

  public static async getInitialProps({
    reduxStore,
    query,
  }: AppContext<Query>) {
    const { group } = query;

    await reduxStore.dispatch(fetchFirstTransactionDate() as any);
    const firstTransactionDate = getFirstTransactionDate(reduxStore.getState());

    const { from, to } = !!group
      ? createRangeForGroup(group)
      : {
          from: firstTransactionDate,
          to: new Date(),
        };

    const currency = getDefaultCurrency(reduxStore.getState());

    await reduxStore.dispatch(fetchStatsCategories(from, to, currency) as any);

    return { group };
  }

  public render() {
    const { group } = this.props;

    return <Categories group={group} />;
  }
}

export default pageWithTranslation([Namespace.Stats, Namespace.Months])(
  CateogiesPage,
);
