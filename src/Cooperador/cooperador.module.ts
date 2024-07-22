import { Module } from '@nestjs/common';
import { PatrocinadorService } from './cooperador.service';
import { CooperadorController } from './cooperador.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CooperadorController],
  providers: [PatrocinadorService,PrismaService],
})
export class CooperadorModule {}
