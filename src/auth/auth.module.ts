import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SharedModule } from 'src/shared/shared.module';
import { ManagerModule } from 'src/manager/manager.module';
import { DelivererModule } from 'src/deliverer/deliverer.module';

@Module({
  imports: [ClientModule, ManagerModule, DelivererModule, SharedModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
