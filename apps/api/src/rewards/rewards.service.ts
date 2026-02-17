import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/database.service';

@Injectable()
export class RewardsService {
  constructor(private readonly db: DatabaseService) {}

  async getLedger(userId: string) {
    const ledger = await this.db.query(
      `SELECT id, event_type, credits_delta, metadata, created_at
       FROM reward_ledger WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    const balance = ledger.rows.reduce((sum: number, row: any) => sum + Number(row.credits_delta), 0);
    return { balance, entries: ledger.rows };
  }
}
