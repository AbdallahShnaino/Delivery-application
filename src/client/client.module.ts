import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SharedModule } from 'src/shared/shared.module';
import { ClientController } from './client.controller';
import { clientsProviders } from './client.providers';
import { ClientService } from './client.service';

@Module({
  imports: [DatabaseModule, SharedModule],
  controllers: [ClientController],
  providers: [ClientService, ...clientsProviders],
  exports: [ClientService],
})
export class ClientModule {}
