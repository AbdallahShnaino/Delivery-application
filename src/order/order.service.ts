import { Inject, Injectable } from '@nestjs/common';
import { Order } from './entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDERS_REPOSITORY')
    private ordersRepository: typeof Order,
  ) {}

  async createOrder(
    clientId: number,
    name: string,
    description: string,
    dropoffLocLatitude: number,
    dropoffLocLongitude: number,
    pickupLocLatitude: number,
    pickupLocLongitude: number,
    quantity: number,
  ): Promise<Order> {
    return this.ordersRepository.create<Order>({
      delivererId: -1,
      state: 'wait for deliverer',
      clientId,
      name,
      description,
      dropoffLocLatitude,
      dropoffLocLongitude,
      pickupLocLatitude,
      pickupLocLongitude,
      quantity,
    });
  }

  async getAllOrders(clientId: number): Promise<Order[]> {
    return this.ordersRepository.findAll({ where: { clientId } });
  }
}
