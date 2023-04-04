/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserLoginDTO } from '../user/dto/userLogin.dto';
import { UserRegisterDTO } from '../user/dto/userRegister.dto';
import { Controller, Post, UsePipes, ValidationPipe, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('/register')
  @UsePipes(new ValidationPipe())
  async create(@Body() dataUSer: UserRegisterDTO) {
    return this.authService.register(dataUSer);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() dataUser: UserLoginDTO) {
    return this.authService.login(dataUser);
  }

  @Post('/refresh-token')
  async refreshToken(@Request() request) {
    const headers: any = request.headers;
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return this.authService.refreshToken(token);
  }
}
