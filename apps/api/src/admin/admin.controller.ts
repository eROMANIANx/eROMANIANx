import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../common/jwt.guard';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(JwtGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('content')
  createContent(@Req() req: any, @Body() body: { title: string; description: string; videoUrl: string; topic: string }) {
    return this.adminService.createContent(req.user.sub, body);
  }

  @Post('level-rules')
  levelRules(@Req() req: any, @Body() body: { watchRequired: number; quizRequired: number }) {
    return this.adminService.updateLevelRules(req.user.sub, body.watchRequired, body.quizRequired);
  }

  @Get('users/:id/progression')
  userProgress(@Req() req: any, @Param('id') id: string) {
    return this.adminService.userProgress(req.user.sub, id);
  }
}
