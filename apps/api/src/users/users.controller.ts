import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../common/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  me(@Req() req: any) {
    return this.usersService.getMe(req.user.sub);
  }

  @Post('interests')
  @UseGuards(JwtGuard)
  interests(@Req() req: any, @Body() body: { interests: string[] }) {
    return this.usersService.setInterests(req.user.sub, body.interests || []);
  }
}
