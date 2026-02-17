import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/database.service';

export type LevelProgress = { currentLevel: number; nextLevel: number | null; remainingMessage: string };

@Injectable()
export class LevelsService {
  constructor(private readonly db: DatabaseService) {}

  static computeL1ToL2(videoCount: number, quizPassCount: number, requiredVideos: number, requiredQuiz: number): LevelProgress {
    const videoLeft = Math.max(requiredVideos - videoCount, 0);
    const quizLeft = Math.max(requiredQuiz - quizPassCount, 0);
    if (videoLeft === 0 && quizLeft === 0) {
      return { currentLevel: 2, nextLevel: 3, remainingMessage: 'Level 2 unlocked. Start foundations quests.' };
    }
    return {
      currentLevel: 1,
      nextLevel: 2,
      remainingMessage: `Need ${videoLeft} more completed videos and ${quizLeft} quiz passes to qualify for Level 2.`
    };
  }

  async getProgress(userId: string) {
    const profile = await this.db.query<{ level: number }>('SELECT level FROM profiles WHERE user_id = $1', [userId]);
    const currentLevel = profile.rows[0]?.level ?? 1;

    const watches = await this.db.query<{ count: string }>(
      "SELECT COUNT(*) FROM watch_events WHERE user_id = $1 AND completed = true",
      [userId]
    );
    const quizzes = await this.db.query<{ count: string }>('SELECT COUNT(*) FROM quiz_attempts WHERE user_id = $1 AND passed = true', [
      userId
    ]);

    const rules = await this.db.query<{ watch_required: number; quiz_required: number }>(
      'SELECT watch_required, quiz_required FROM level_rules WHERE from_level = 1 AND to_level = 2 LIMIT 1'
    );
    const cfg = rules.rows[0] || { watch_required: 50, quiz_required: 5 };

    const computed = LevelsService.computeL1ToL2(
      Number(watches.rows[0]?.count || 0),
      Number(quizzes.rows[0]?.count || 0),
      cfg.watch_required,
      cfg.quiz_required
    );

    if (computed.currentLevel > currentLevel) {
      await this.db.query('UPDATE profiles SET level = $2 WHERE user_id = $1', [userId, computed.currentLevel]);
    }

    return { ...computed, configuredRules: cfg, currentLevel: Math.max(currentLevel, computed.currentLevel) };
  }
}
