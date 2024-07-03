import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator"

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsIn(["user", "admin", "superAdmin"])
  role: string
}