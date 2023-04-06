import { Injectable } from '@nestjs/common';
import { IUser } from './interface/interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {

  constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  async getAllUser(): Promise<IUser[]>{
    const users: IUser[] = await this.userRepository.find();
    return users;
  }
}
