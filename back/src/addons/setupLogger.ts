import { INestApplication } from '@nestjs/common';
import * as morgan from 'morgan';

export const setupLogger = (app: INestApplication) => {
  app.use(morgan('common'));
};
