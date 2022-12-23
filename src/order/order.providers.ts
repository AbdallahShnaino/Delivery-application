import { Order } from './entity/order.entity';

export const ordersProviders = [
  {
    provide: 'ORDERS_REPOSITORY',
    useValue: Order,
  },
];
