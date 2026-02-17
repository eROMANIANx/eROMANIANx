import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from '../common/database.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly db: DatabaseService) {}

  async track(userId: string, eventName: string, payload: Record<string, unknown>) {
    await this.db.query(
      'INSERT INTO analytics_events (id, user_id, event_name, payload, created_at) VALUES ($1, $2, $3, $4::jsonb, NOW())',
      [uuid(), userId, eventName, JSON.stringify(payload)]
    );
    return { tracked: true };
  }
}
