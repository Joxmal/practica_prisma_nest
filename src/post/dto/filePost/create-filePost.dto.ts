import {IsString, MinLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateFilePostDto{

@IsString()
name: string = 'sin grupo'

@ApiProperty({ type: 'string', format: 'binary', required: true,isArray:true })
file: Array<Express.Multer.File>
}