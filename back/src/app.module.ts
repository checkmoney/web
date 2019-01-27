import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

@Module({ })
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}