import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PostModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
