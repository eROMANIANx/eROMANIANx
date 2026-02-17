import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../common/jwt.guard';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
@UseGuards(JwtGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('event')
  event(@Req() req: any, @Body() body: { eventName: string; payload?: Record<string, unknown> }) {
    return this.analyticsService.track(req.user.sub, body.eventName, body.payload || {});
  }
}
