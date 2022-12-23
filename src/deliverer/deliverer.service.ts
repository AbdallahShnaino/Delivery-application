import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Message, throwCustomException } from 'src/errors/list.exception';
import { Deliverer } from './entity/deliverer.entity';

@Injectable()
export class DelivererService {
  constructor(
    @Inject('DELIVERERS_REPOSITORY')
    private delivererRepository: typeof Deliverer,
  ) {}

  async findWithEmail(email: string): Promise<Deliverer> {
    return this.delivererRepository.findOne<Deliverer>({ where: { email } });
  }

  async createUser(
    fullName: string,
    email: string,
    phone_number: number,
    password: string,
  ): Promise<Deliverer> {
    return this.delivererRepository.create<Deliverer>({
      fullName,
      email,
      phone_number,
      password,
    });
  }

  async findWithId(id: number): Promise<Deliverer> {
    if (!id) {
      throwCustomException(Message.IdCouldNotBeNull, HttpStatus.NOT_ACCEPTABLE);
    }
    return this.delivererRepository.findByPk<Deliverer>(id);
  }
}
