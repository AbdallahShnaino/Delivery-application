import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Message, throwCustomException } from 'src/errors/list.exception';
import { Manager } from './entity/manager.entity';

@Injectable()
export class ManagerService {
  constructor(
    @Inject('MANAGERS_REPOSITORY')
    private managerRepository: typeof Manager,
  ) {}

  async findWithEmail(email: string): Promise<Manager> {
    return this.managerRepository.findOne<Manager>({ where: { email } });
  }

  async createUser(
    fullName: string,
    email: string,
    phone_number: number,
    password: string,
  ): Promise<Manager> {
    return this.managerRepository.create<Manager>({
      fullName,
      email,
      phone_number,
      password,
    });
  }

  async findWithId(id: number): Promise<Manager> {
    if (!id) {
      throwCustomException(Message.IdCouldNotBeNull, HttpStatus.NOT_ACCEPTABLE);
    }
    return this.managerRepository.findByPk<Manager>(id);
  }
}
