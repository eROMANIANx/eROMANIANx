import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './common/database.module';
import { UsersModule } from './users/users.module';
import { ContentModule } from './content/content.module';
import { QuizModule } from './quiz/quiz.module';
import { RewardsModule } from './rewards/rewards.module';
import { LevelsModule } from './levels/levels.module';
import { CommunitiesModule } from './communities/communities.module';
import { AiModule } from './ai/ai.module';
import { AdminModule } from './admin/admin.module';
import { ProjectsModule } from './projects/projects.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    ContentModule,
    QuizModule,
    RewardsModule,
    LevelsModule,
    CommunitiesModule,
    AiModule,
    AdminModule,
    ProjectsModule,
    AnalyticsModule
  ]
})
export class AppModule {}
