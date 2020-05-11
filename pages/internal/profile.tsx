import * as React from 'react';

import { Profile } from '&front/features/profile';

class ProfilePage extends React.Component {
  public static isSecure = true;

  public render() {
    return <Profile />;
  }
}

export default ProfilePage;
