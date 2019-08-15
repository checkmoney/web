import { ComposeMethodDecorators } from '@breadhead/detil-ts';
import { ApiImplicitQuery } from '@nestjs/swagger';

export const ApiQueryDateRange = () =>
  ComposeMethodDecorators([
    ApiImplicitQuery({ name: 'from', type: String }),
    ApiImplicitQuery({ name: 'to', type: String }),
  ]);
