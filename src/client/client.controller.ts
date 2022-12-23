import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get('/')
  async getAllUsers() {
    return await this.clientService.findAll();
  }

  @Get('/:id')
  async findUserWithId(@Param('id', ParseIntPipe) id: number) {
    return await this.clientService.findWithId(id);
  }

  /* 
  @Delete('/:id')
 @UseGuards(AuthGard)
  async removeUser(
    @Param('id', ParseIntPipe) id: number,
    @Session() session: Record<string, any>,
  ) {
    if (session.userId === id) {
      session.userId = null;
      return await this.usersService.remove(id);
    }
    throw new UnauthorizedException();
  }

  @Patch('/:id')
  @UseGuards(AuthGard)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
    @Session() session: Record<string, any>,
  ) {
    if (session.userId === id) {
      return await this.usersService.update(id, body);
    }
    throw new UnauthorizedException();
  }
*/

  @Get()
  async getUserWithEmail(@Query('email') email: string) {
    return await this.clientService.findWithEmail(email);
  }

  @Get()
  async getUserWithPhoneNumber(
    @Query('phoneNumber', ParseIntPipe) phoneNumber: number,
  ) {
    return await this.clientService.findWithPhoneNumber(phoneNumber);
  }
}
