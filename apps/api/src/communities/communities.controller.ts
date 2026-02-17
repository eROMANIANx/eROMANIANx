import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../common/jwt.guard';
import { CommunitiesService } from './communities.service';

@Controller('communities')
@UseGuards(JwtGuard)
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  list() {
    return this.communitiesService.list();
  }

  @Post('join')
  join(@Req() req: any, @Body() body: { communityId: string }) {
    return this.communitiesService.join(req.user.sub, body.communityId);
  }

  @Post('post')
  post(@Req() req: any, @Body() body: { communityId: string; body: string }) {
    return this.communitiesService.createPost(req.user.sub, body.communityId, body.body);
  }
}
