import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class UserDTO {
    @IsNotEmpty()
    @IsNumber()
      id: number;

    @IsNotEmpty()
    @IsString()
      username: string;

    @IsNotEmpty()
    @IsString()
      password: string;
}