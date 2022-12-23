import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ordersProviders } from './order.providers';

@Module({
  providers: [OrderService, ...ordersProviders],
  controllers: [OrderController],
})
export class OrderModule {}
