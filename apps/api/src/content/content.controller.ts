import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../common/jwt.guard';
import { ContentService } from './content.service';

@Controller('content')
@UseGuards(JwtGuard)
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('feed')
  feed(@Req() req: any) {
    return this.contentService.feed(req.user.sub);
  }

  @Post('watch-event')
  complete(@Req() req: any, @Body() body: { contentItemId: string; progressPercent: number }) {
    return this.contentService.complete(req.user.sub, body.contentItemId, body.progressPercent);
  }
}
