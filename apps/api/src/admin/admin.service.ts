import { Injectable, UnauthorizedException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from '../common/database.service';

@Injectable()
export class AdminService {
  constructor(private readonly db: DatabaseService) {}

  async assertAdmin(userId: string) {
    const role = await this.db.query<{ role: string }>('SELECT role FROM users WHERE id = $1', [userId]);
    if (role.rows[0]?.role !== 'admin') throw new UnauthorizedException('Admin only');
  }

  async createContent(userId: string, body: { title: string; description: string; videoUrl: string; topic: string }) {
    await this.assertAdmin(userId);
    await this.db.query(
      `INSERT INTO content_items (id, title, description, video_url, topic, level_target, is_published, created_at)
       VALUES ($1, $2, $3, $4, $5, 1, true, NOW())`,
      [uuid(), body.title, body.description, body.videoUrl, body.topic]
    );
    return { created: true };
  }

  async updateLevelRules(userId: string, watchRequired: number, quizRequired: number) {
    await this.assertAdmin(userId);
    await this.db.query(
      `UPDATE level_rules SET watch_required = $1, quiz_required = $2, updated_at = NOW()
       WHERE from_level = 1 AND to_level = 2`,
      [watchRequired, quizRequired]
    );
    return { updated: true };
  }

  async userProgress(userId: string, targetUserId: string) {
    await this.assertAdmin(userId);
    const profile = await this.db.query('SELECT user_id, display_name, level, credits_balance, streak FROM profiles WHERE user_id = $1', [
      targetUserId
    ]);
    const ledger = await this.db.query(
      'SELECT event_type, credits_delta, metadata, created_at FROM reward_ledger WHERE user_id = $1 ORDER BY created_at DESC LIMIT 25',
      [targetUserId]
    );
    return { profile: profile.rows[0], ledger: ledger.rows };
  }
}
