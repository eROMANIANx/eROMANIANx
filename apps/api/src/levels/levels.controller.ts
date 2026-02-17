import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../common/jwt.guard';
import { LevelsService } from './levels.service';

@Controller('levels')
@UseGuards(JwtGuard)
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Get('progress')
  progress(@Req() req: any) {
    return this.levelsService.getProgress(req.user.sub);
  }
}
