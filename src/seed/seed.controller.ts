import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SeedService } from './seed.service';


@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('admin')
  CreateseedAdmin( 
    @Query('key') key:string) {
    return this.seedService.seedAdmin(key);
  }

}
