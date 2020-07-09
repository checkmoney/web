import React from 'react';
import { useRoute } from 'react-router5';

import { Route } from '&front/application/router';
import { Landing } from '&front/legacy_features/landing';
import { App } from '&front/legacy_features/app';
import { Hello } from '&front/legacy_features/hello';
import { History } from '&front/legacy_features/history';
import { Profile } from '&front/legacy_features/profile';
import { Statistics } from '&front/legacy_features/statistics';
import { Sources } from '&front/legacy_features/statistics/features/details/sources';
import { Categories } from '&front/legacy_features/statistics/features/details/categories';

export function Application() {
  const { route } = useRoute();

  switch (route.name) {
    case Route.Login:
      return <Landing />;
    case Route.Dashboard:
      return <App />;
    case Route.Hello:
      return <Hello />;
    case Route.History:
      return <History />;
    case Route.Profile:
      return <Profile />;
    case Route.Statistics:
      return <Statistics />;
    case Route.DetailedStatistics:
      if (route.params.type === 'sources') {
        return <Sources group={route.params.group} />;
      }
      if (route.params.type === 'categories') {
        return <Categories group={route.params.group} />;
      }
      return null;
    default:
      return null;
  }
}
