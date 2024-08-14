import { IsArray, IsInt, IsNumber } from "class-validator";

export class CarruselCreateImageDto {

@IsArray()
@IsInt({
    each:true
})
idImages:[]
}
