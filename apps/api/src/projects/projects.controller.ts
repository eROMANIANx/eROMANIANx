import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../common/jwt.guard';
import { ProjectsService } from './projects.service';

@Controller('projects')
@UseGuards(JwtGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  list() {
    return this.projectsService.list();
  }

  @Post('submit')
  submit(@Req() req: any, @Body() body: { projectId: string; submissionText?: string; submissionLink?: string; fileUrl?: string }) {
    return this.projectsService.submit(req.user.sub, body);
  }
}
