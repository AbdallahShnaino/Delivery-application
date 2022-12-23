import { Sequelize } from 'sequelize-typescript';
import { Client } from 'src/client/entity/client.entity';
import { Deliverer } from '../deliverer/entity/deliverer.entity';
import { Manager } from '../manager/entity/manager.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root1234',
        database: 'delivery_db',
      });

      sequelize.addModels([Client, Deliverer, Manager]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
