import { Deliverer } from './entity/deliverer.entity';

export const deliverersProviders = [
  {
    provide: 'DELIVERERS_REPOSITORY',
    useValue: Deliverer,
  },
];
