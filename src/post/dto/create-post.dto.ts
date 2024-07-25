import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator";

export class CreatePostDto {

@IsString()
@MinLength(5)
title: string;
    
@IsNotEmpty()
@IsString()
@IsOptional()
content: string;

@IsNotEmpty()
@IsString()
@MaxLength(80)
@IsOptional()
summary: string

@IsOptional()
@IsBoolean()
published?: boolean

@IsArray()
@IsOptional()
@IsUrl(
  {
    require_protocol: true,  
  },{
    each:true
  }
)
images?: string[]

@IsNotEmpty()
@IsNumber()
authorID: number

@IsArray()
@IsOptional()
filesPost?: number[]

@IsArray()
@IsOptional()
cooperador?: number[] 

}
