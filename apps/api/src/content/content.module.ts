import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET || 'dev-secret-change-me' })],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService]
})
export class ContentModule {}
