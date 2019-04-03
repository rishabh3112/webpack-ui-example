import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

export async function startServer() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '../../ui-gui/', 'dist'));
  await app.listen(1234, () => {
    process.stdout.write('[wui] Running at http://localhost:1234/ \n');
  });
}
