import { IsOptional, IsString } from "class-validator"
import { PaginationDto } from "src/common/dto/pagination.dto"

export class FindAllPost extends PaginationDto  {
    @IsOptional()
    @IsString()
    categoria?: string

    @IsOptional()
    @IsString()
    titleSearch?: string

    @IsOptional()
    @IsString()
    token?:string
}