import * as morgan from 'morgan';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Enable morgan for logging HTTP requests
  app.use(morgan('dev'));

  // Apply validation pipes to all requests
  app.useGlobalPipes( 
    new ValidationPipe({
      transformOptions:{
        enableImplicitConversion: true
      },  
      whitelist: true, 
      forbidNonWhitelisted: true, 
    }) 
  );
  
  
  // Enable CORS for cross-origin requests
  app.enableCors();

  // Set prefix for API endpoints
  app.setGlobalPrefix('api');

  // Start the server and listen on port 3000
  await app.listen(3000);
  console.log(`app in ${await app.getUrl()}`)
}
bootstrap();
