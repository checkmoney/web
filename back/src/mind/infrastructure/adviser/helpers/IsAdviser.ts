import { Injectable } from '@nestjs/common';

type Decorator = () => ClassDecorator;

type HandlerDecorator = Decorator & {
  handlers?: Set<any>;
};

export const IsAdviser: HandlerDecorator = () => target => {
  if (!IsAdviser.handlers) {
    IsAdviser.handlers = new Set();
  }

  IsAdviser.handlers.add(target);

  return Injectable()(target);
};
