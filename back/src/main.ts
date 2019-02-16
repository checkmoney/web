import { NestFactory } from '@nestjs/core'

import { setupCors } from '@back/addons/setupCors'
import { setupLogger } from '@back/addons/setupLogger'
import { setupSwagger } from '@back/addons/setupSwagger'
import { AppModule } from '@back/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  setupCors(app)
  setupLogger(app)
  setupSwagger(app, 'docs')

  await app.listen(3000)
}

bootstrap()
