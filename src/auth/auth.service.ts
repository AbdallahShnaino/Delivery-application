import { Injectable, HttpStatus } from '@nestjs/common';
import { scrypt as _scrypt } from 'crypto';
import { ClientService } from 'src/client/client.service';
import { Client } from 'src/client/entity/client.entity';
import { DelivererService } from 'src/deliverer/deliverer.service';
import { Deliverer } from 'src/deliverer/entity/deliverer.entity';
import { Message, throwCustomException } from 'src/errors/list.exception';
import { Manager } from 'src/manager/entity/manager.entity';
import { ManagerService } from 'src/manager/manager.service';
import { PasswordService } from '../shared/password.service';

@Injectable()
export class AuthService {
  constructor(
    private passwordService: PasswordService,
    private clientService: ClientService,
    private managerService: ManagerService,
    private delivererService: DelivererService,
  ) {}

  async signup(
    fullName: string,
    email: string,
    phone_number: number,
    password: string,
    type: string,
  ) {
    let user: Client | Manager | Deliverer = null;
    if (type === 'client') {
      user = await this.clientService.findWithEmail(email);
    }

    if (type === 'deliverer') {
      user = await this.delivererService.findWithEmail(email);
    }

    if (type === 'manager') {
      user = await this.managerService.findWithEmail(email);
    }

    if (user) {
      throwCustomException(Message.UserExist, HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await this.passwordService.toHash(password);
    if (type === 'client') {
      user = await this.clientService.createUser(
        fullName,
        email,
        phone_number,
        hashedPassword,
      );
    }

    if (type === 'deliverer') {
      user = await this.delivererService.createUser(
        fullName,
        email,
        phone_number,
        hashedPassword,
      );
    }

    if (type === 'manager') {
      user = await this.managerService.createUser(
        fullName,
        email,
        phone_number,
        hashedPassword,
      );
    }

    return user;
  }
  async signin(email: string, password: string, type: string) {
    let user: Client | Manager | Deliverer = null;
    if (type === 'client') {
      user = await this.clientService.findWithEmail(email);
    }

    if (type === 'deliverer') {
      user = await this.delivererService.findWithEmail(email);
    }

    if (type === 'manager') {
      user = await this.managerService.findWithEmail(email);
    }

    if (!user) {
      throwCustomException(Message.UserNotFound, HttpStatus.BAD_REQUEST);
    }
    const res = await this.passwordService.compare(user.password, password);

    if (!res) {
      throwCustomException(Message.BadPassword, HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
