import {IsString, MinLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateFilePostDto{

@IsString()
@MinLength(5)
name: string

@ApiProperty({ type: 'string', format: 'binary', required: true,isArray:true })
file: Array<Express.Multer.File>
}