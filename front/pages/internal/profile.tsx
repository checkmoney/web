import * as React from 'react';

import { pageWithTranslation, Namespace } from '&front/domain/i18n';
import { Profile } from '&front/features/profile';

class ProfilePage extends React.Component {
  public static isSecure = true;

  public render() {
    return <Profile />;
  }
}

export default pageWithTranslation([Namespace.Profile, Namespace.Currency])(
  ProfilePage,
);
