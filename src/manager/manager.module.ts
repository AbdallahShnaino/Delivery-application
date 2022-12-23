import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { managersProviders } from './client.providers';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ManagerController],
  providers: [ManagerService, ...managersProviders],
  exports: [ManagerService],
})
export class ManagerModule {}
