import { Client } from './entity/client.entity';

export const clientsProviders = [
  {
    provide: 'CLIENTS_REPOSITORY',
    useValue: Client,
  },
];
