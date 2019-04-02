import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export async function startServer() {
  const app = await NestFactory.create(AppModule);
  await app.listen(1234, () => {
    process.stdout.write('[wui] Running at http://localhost:1234/ \n');
  });
}
