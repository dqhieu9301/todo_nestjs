import { IsNotEmpty, IsString, IsDateString, IsBoolean } from "class-validator";


export class TodoDTO {

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




    

    
}