import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator";

export class CreatePostDto {

@IsString()
@MinLength(5)
title: string;
    
@IsNotEmpty()
@IsArray()
@IsString({
  each:true
})
@IsOptional()
content: string[];

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

@IsNumber()
@IsOptional()
template?: number = 1

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
