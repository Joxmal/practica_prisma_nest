import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PostModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
