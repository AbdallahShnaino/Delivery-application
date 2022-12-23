import { Module } from '@nestjs/common';
import { DelivererService } from './deliverer.service';
import { DelivererController } from './deliverer.controller';
import { deliverersProviders } from './deliverer.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DelivererController],
  providers: [DelivererService, ...deliverersProviders],
  exports: [DelivererService],
})
export class DelivererModule {}
