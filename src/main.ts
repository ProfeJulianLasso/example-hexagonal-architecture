import { NestFactory } from '@nestjs/core';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

async function bootstrap() {
  const app = await NestFactory.create(InfrastructureModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap()
  .then(() =>
    console.log('🚀 Application is running on port', process.env.PORT ?? 3000),
  )
  .catch((error: Error) => {
    console.error('Application failed to start:', error);
    process.exit(1);
  });
