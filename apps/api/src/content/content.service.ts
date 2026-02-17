import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/database.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ContentService {
  constructor(private readonly db: DatabaseService) {}

  async feed(userId: string) {
    const rows = await this.db.query(
      `SELECT c.id, c.title, c.description, c.video_url, c.level_target,
              EXISTS(SELECT 1 FROM watch_events w WHERE w.user_id = $1 AND w.content_item_id = c.id AND w.completed = true) AS completed
       FROM content_items c WHERE c.is_published = true ORDER BY c.created_at DESC LIMIT 50`,
      [userId]
    );
    return rows.rows;
  }

  async complete(userId: string, contentItemId: string, progressPercent: number) {
    const completed = progressPercent >= 95;
    await this.db.query(
      `INSERT INTO watch_events (id, user_id, content_item_id, progress_percent, completed, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [uuid(), userId, contentItemId, progressPercent, completed]
    );

    if (completed) {
      await this.db.query(
        `INSERT INTO reward_ledger (id, user_id, event_type, credits_delta, metadata, created_at)
         VALUES ($1, $2, 'video_complete',
           COALESCE((SELECT credits FROM reward_rules WHERE event_type = 'video_complete' LIMIT 1), 5),
           $3::jsonb, NOW())`,
        [uuid(), userId, JSON.stringify({ contentItemId })]
      );
      await this.db.query(
        `UPDATE profiles SET credits_balance = (
          SELECT COALESCE(SUM(credits_delta), 0) FROM reward_ledger WHERE user_id = $1
        ) WHERE user_id = $1`,
        [userId]
      );
    }

    return { completed };
  }
}
