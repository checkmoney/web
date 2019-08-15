import { INestApplication } from '@nestjs/common';
import * as cors from 'cors';

export const setupCors = (app: INestApplication) => {
  app.use(cors());
};
