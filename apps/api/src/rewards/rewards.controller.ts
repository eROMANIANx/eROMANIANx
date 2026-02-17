import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../common/jwt.guard';
import { RewardsService } from './rewards.service';

@Controller('rewards')
@UseGuards(JwtGuard)
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Get('ledger')
  ledger(@Req() req: any) {
    return this.rewardsService.getLedger(req.user.sub);
  }
}
