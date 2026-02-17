import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LevelsController } from './levels.controller';
import { LevelsService } from './levels.service';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET || 'dev-secret-change-me' })],
  controllers: [LevelsController],
  providers: [LevelsService],
  exports: [LevelsService]
})
export class LevelsModule {}
