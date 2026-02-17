import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET || 'dev-secret-change-me' })],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
