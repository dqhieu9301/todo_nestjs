import { IsNotEmpty, IsString } from "class-validator";

export class UserRegisterDTO {
    @IsNotEmpty()
    @IsString()
      username: string;

    @IsNotEmpty()
    @IsString()
      password: string;
}