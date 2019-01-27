import { NestFactory } from '@nestjs/core'

import { AppModule } from '@back/app.module'
import setupCors from '@back/config/cors'
import setupSwagger from '@back/config/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  setupSwagger(app, 'docs')
  setupCors(app)

  await app.listen(3000)
}

bootstrap()
