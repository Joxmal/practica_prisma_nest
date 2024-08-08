import { IsArray, IsIn, IsNumber, IsOptional, IsString, Max, MaxLength, MinLength } from "class-validator"

export class CreateCooperadorDto {

    @MaxLength(2)
    @IsString()
    @IsOptional()
    @IsIn(["V", "J", "E"])
    tipoCedula?: String

    @IsNumber()
    cedula: number

    @MaxLength(30)
    @IsString()
    nombre: string

    @MaxLength(30)
    @IsString()
    @IsOptional()
    ubicacion?: string

    @IsString()
    @IsIn(["P", "C"]) //patrocinador- colaborador
    @MaxLength(15)
    tipo: string

    @IsOptional()
    @IsString({
        each: true
    })
    @IsArray()
    categoria?: string[]




}
