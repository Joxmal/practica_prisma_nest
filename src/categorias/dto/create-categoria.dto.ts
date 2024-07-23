import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateCategoriaDto {

@IsString()
name: string

@IsArray()
@IsOptional()
cooperador?:number[] 

}
