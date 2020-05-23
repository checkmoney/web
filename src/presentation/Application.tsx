import React from 'react';
import { useRoute } from 'react-router5';

import { Route } from '&front/app/router/router.types';
import { Landing } from '&front/features/landing';
import { App } from '&front/features/app';
import { Hello } from '&front/features/hello';
import { History } from '&front/features/history';
import { Profile } from '&front/features/profile';
import { Statistics } from '&front/features/statistics';
import { Sources } from '&front/features/statistics/features/details/sources';
import { Categories } from '&front/features/statistics/features/details/categories';
import { Manager } from '&front/features/manager';

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
    case Route.Manager:
      return <Manager />;
    default:
      return null;
  }
}
