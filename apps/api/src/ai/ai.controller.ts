import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../common/jwt.guard';
import { AiService } from './ai.service';

@Controller('ai')
@UseGuards(JwtGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  chat(@Req() req: any, @Body() body: { message: string; interests?: string[] }) {
    return this.aiService.chat(req.user.sub, body.message);
  }

  @Post('tools/set-interests')
  setInterests(@Req() req: any, @Body() body: { interests: string[] }) {
    return this.aiService.setInterests(req.user.sub, body.interests || []);
  }

  @Post('tools/create-wallet')
  createWallet(@Req() req: any) {
    return this.aiService.createWallet(req.user.sub);
  }

  @Post('tools/recommend-next')
  recommend(@Req() req: any) {
    return this.aiService.recommendNext(req.user.sub);
  }

  @Post('tools/get-progress')
  progress(@Req() req: any) {
    return this.aiService.getProgress(req.user.sub);
  }
}
