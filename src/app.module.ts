import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ExcelModule } from './excel/excel.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/post/',
      rootPath: join(__dirname, '..', 'static/uploads/filePost'),
    }),
    ConfigModule.forRoot(),
    PostModule, AuthModule, UsersModule, SeedModule, ExcelModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
