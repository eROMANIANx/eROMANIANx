import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CommunitiesController } from './communities.controller';
import { CommunitiesService } from './communities.service';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET || 'dev-secret-change-me' })],
  controllers: [CommunitiesController],
  providers: [CommunitiesService]
})
export class CommunitiesModule {}
