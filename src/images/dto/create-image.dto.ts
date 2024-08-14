import { IsArray, IsInt } from "class-validator";

export class CreateImageDto {
@IsInt({
    each:true
})
@IsArray()
id_images:number[]

}
