import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MinLength } from "class-validator";

export class CreatePostDto {

@IsString()
@MinLength(5)
title: string;
    
@IsNotEmpty()
@IsString()
content: string;

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
patrocinador?: number[] 

}
