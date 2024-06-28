import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class CreatePostDto {

@IsString()
title: string;
    
@IsNotEmpty()
@IsString()
content: string;

@IsArray()
@IsOptional()
@IsUrl({
  require_protocol: true,  
},{
  each:true
}
)
image?: string[]

@IsOptional()
@IsBoolean()
published: boolean



}
