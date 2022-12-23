import { MiddlewareConsumer, Module, Scope } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { DatabaseModule } from './database/database.module';
import { DelivererModule } from './deliverer/deliverer.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ManagerModule } from './manager/manager.module';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';
import { SharedModule } from './shared/shared.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ClientModule,
    DelivererModule,
    ManagerModule,
    SharedModule,
    OrderModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
