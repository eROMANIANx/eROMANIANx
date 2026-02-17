import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RewardsController } from './rewards.controller';
import { RewardsService } from './rewards.service';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET || 'dev-secret-change-me' })],
  providers: [RewardsService],
  controllers: [RewardsController],
  exports: [RewardsService]
})
export class RewardsModule {}
