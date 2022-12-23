import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Message, throwCustomException } from 'src/errors/list.exception';
import { PasswordService } from 'src/shared/password.service';
import { Client } from './entity/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @Inject('CLIENTS_REPOSITORY')
    private clientsRepository: typeof Client,
    private passwordService: PasswordService,
  ) {}

  async createUser(
    fullName: string,
    email: string,
    phone_number: number,
    password: string,
  ): Promise<Client> {
    return this.clientsRepository.create<Client>({
      fullName,
      email,
      phone_number,
      password,
    });
  }

  async findAll(): Promise<Client[]> {
    return this.clientsRepository.findAll<Client>();
  }

  async findWithEmail(email: string): Promise<Client> {
    return this.clientsRepository.findOne<Client>({ where: { email } });
  }

  async findWithPhoneNumber(phone_number: number): Promise<Client> {
    return this.clientsRepository.findOne<Client>({ where: { phone_number } });
  }

  async findWithId(id: number): Promise<Client> {
    if (!id) {
      throwCustomException(Message.IdCouldNotBeNull, HttpStatus.NOT_ACCEPTABLE);
    }
    return this.clientsRepository.findByPk<Client>(id);
  }

  async remove(id: number) {
    const user = await this.findWithId(id);
    if (!user) {
      throwCustomException(Message.UserNotFound, HttpStatus.NOT_FOUND);
    }
    const status = await this.clientsRepository.destroy<Client>({
      where: { id: user.id },
    });
    if (status > 0) {
      return user;
    } else {
      throwCustomException(Message.RemoveFailed, HttpStatus.CONFLICT);
    }
  }

  async update(id: number, attrs: Partial<Client>): Promise<Partial<Client>> {
    const user = await this.findWithId(id);
    if (!user) {
      throwCustomException(Message.UserNotFound, HttpStatus.NOT_FOUND);
    }
    const updatedUserEntity = Object.assign(user, attrs);
    if (attrs.password) {
      updatedUserEntity.password = await this.passwordService.toHash(
        attrs.password,
      );
    }
    try {
      console.log(updatedUserEntity.dataValues);
      const updateStatus = await this.clientsRepository.update(
        updatedUserEntity.dataValues,
        {
          where: {
            id,
          },
        },
      );
      if (updateStatus[0] > 0) {
        return updatedUserEntity;
      } else {
        throwCustomException(Message.UpdateFailed, HttpStatus.CONFLICT);
      }
    } catch (error) {
      throwCustomException(Message.DuplicatedEmail, HttpStatus.BAD_REQUEST);
    }
  }
}
