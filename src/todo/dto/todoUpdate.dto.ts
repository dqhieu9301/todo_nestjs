import { IsNotEmpty, IsString, IsDateString, IsBoolean, IsNumber } from "class-validator";


export class TodoUpdateDTO {

    @IsNotEmpty()
    @IsString()
      name: string;

    @IsNotEmpty()
    @IsDateString()
      dateStart: Date;

    @IsNotEmpty()
    @IsDateString()
      dateEnd: Date;

    @IsNotEmpty()
    @IsBoolean()
      isStatus: boolean;

    @IsNotEmpty()
    @IsNumber()
      idUser: number;
    
}