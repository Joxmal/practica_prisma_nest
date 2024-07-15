import { PartialType } from '@nestjs/mapped-types';
import { CreateFilePostDto } from './create-filePost.dto';

export class UpdateFilePostDto extends PartialType(CreateFilePostDto) {}
