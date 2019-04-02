import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiService } from './api/api.service';
import { WebpackMiddleware } from './webpack.middleware';
import { ApiController } from './api/api.controller';
@Module({
  imports: [],
  controllers: [AppController, ApiController],
  providers: [ApiService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(WebpackMiddleware)
      .forRoutes('api');
  }
}
