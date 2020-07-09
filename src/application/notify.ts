import { createEvent } from 'effector';

const errorHappened = createEvent<string>();
const somethingHappened = createEvent<string>();

export { errorHappened, somethingHappened };
