import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../common/jwt.guard';
import { QuizService } from './quiz.service';

@Controller('quizzes')
@UseGuards(JwtGuard)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('submit')
  submit(@Req() req: any, @Body() body: { quizId: string; answers: Record<string, string> }) {
    return this.quizService.submit(req.user.sub, body.quizId, body.answers || {});
  }
}
