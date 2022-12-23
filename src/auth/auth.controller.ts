import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Client } from 'src/client/entity/client.entity';
import { CurrentUser } from 'src/decorators/current-user-decorator';
import { Deliverer } from 'src/deliverer/entity/deliverer.entity';
import { AuthGard } from 'src/guards/auth.guard';
import { serialize } from 'src/interceptors/serialize-interceptors';
import { Manager } from 'src/manager/entity/manager.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ShowUserDto } from './dto/show-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';

@Controller('auth')
@serialize(ShowUserDto)
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async createUser(
    @Body() { fullName, email, phone_number, password, type }: CreateUserDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.signup(
      fullName,
      email,
      phone_number,
      password,
      type,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signIn(
    @Body() { email, password, type }: SignInUserDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.signin(email, password, type);
    session.userId = user.id;
    session.type = type;
    return user;
  }

  @Get('/whoami')
  @UseGuards(AuthGard)
  whoami(@CurrentUser() user: Client | Manager | Deliverer) {
    return user;
  }

  @Get('/signout')
  signOut(@Session() session: Record<string, any>) {
    session.userId = null;
    session.type = null;
  }
}
