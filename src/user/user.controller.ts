import { Roles, Role } from './../auth/role/role.decorator';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleGuard } from '../auth/role/role.guard';
import { AuthGuard } from '../auth/auth.guard';

@Controller('/api/user')
export class UserController {
  constructor(
        private readonly userSerivce: UserService
  ) {}

  @Get('/getAll')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard ,RoleGuard)
  async getAllUser() {
    return await this.userSerivce.getAllUser();
  }

}
