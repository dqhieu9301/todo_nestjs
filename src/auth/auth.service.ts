import { User } from '../entity/user.entity';
import { expiresAccessToken, expiresRefreshToken } from './../common/constant';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IUser } from 'src/user/interface/interface';
import { IStatus } from 'src/todo/interface/interface';
import * as bcrypt from 'bcrypt';
import { Token } from '../entity/token.entity';

@Injectable()
export class AuthService {
  constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Token) private readonly tokenRepository: Repository<Token> ,
        private readonly jwtService: JwtService
  ) {}

  async register( dataUser: IUser): Promise<IStatus> {
    const status ={ message: "create user success" };
    const { username, password } = dataUser;
    const user = await this.userRepository.findOne({ where: { username: username }});
    if(user) {
      throw new BadRequestException("Username exist");
    }

    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    await this.userRepository.save({ username: username, password: hashPassword });
    return status;
  }
  
  async login( dataUser: IUser) {
    const { username, password } = dataUser;;
    const user = await this.userRepository.findOne({ where: { username: username }});
    if(!user) {
      throw new BadRequestException("Username doesn't exits");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      throw new BadRequestException("Wrong password");
    }

    const payload = { username: user.username, id: user.id };
    const accessToken = await this.jwtService.signAsync(payload, { secret: process.env.SECRET_KEY, expiresIn: expiresAccessToken });
    const refreshToken = await this.jwtService.signAsync(payload, { secret: process.env.REFRESH_SECRET_KEY, expiresIn: expiresRefreshToken });
    
    const inforToken: any = await this.tokenRepository.findOne({ where: { idUser: user.id }});
    if(inforToken) {
      await this.tokenRepository.update({id: inforToken.id}, { accessToken: accessToken, refreshToken: refreshToken });
    } else {
      await this.tokenRepository.save({ accessToken: accessToken, idUser: user.id, refreshToken: refreshToken });
    }
    return {
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret : process.env.REFRESH_SECRET_KEY
      });
      const newPayload = { username: payload.username, id: payload.id };
      const inforToken: any = await this.tokenRepository.findOne({ where: { refreshToken: refreshToken, idUser: payload.id }});
      if(!inforToken) {
        throw new BadRequestException("Wrong refreshToken");
      }
      const accessToken = await this.jwtService.signAsync(newPayload, { secret: process.env.SECRET_KEY, expiresIn: expiresAccessToken });
      await this.tokenRepository.update({ idUser: payload.id }, { accessToken: accessToken });
      return {
        accessToken: accessToken
      };
    } catch (err) {
      throw new BadRequestException("Wrong refreshToken");
    }
  }
}
