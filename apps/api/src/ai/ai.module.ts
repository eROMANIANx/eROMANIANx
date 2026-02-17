import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { UsersModule } from '../users/users.module';
import { LevelsModule } from '../levels/levels.module';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET || 'dev-secret-change-me' }), UsersModule, LevelsModule],
  controllers: [AiController],
  providers: [AiService]
})
export class AiModule {}
