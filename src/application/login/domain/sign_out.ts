import { createEvent } from 'effector';

import { router, Route } from '&front/application/router';
import { tokenChanged } from '&front/application/viewer';

const loggedOut = createEvent();
loggedOut.watch(() => {
  tokenChanged(null);
  router.navigate(Route.Login);
});

export { loggedOut };
