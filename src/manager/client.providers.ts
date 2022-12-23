import { Manager } from './entity/manager.entity';

export const managersProviders = [
  {
    provide: 'MANAGERS_REPOSITORY',
    useValue: Manager,
  },
];
