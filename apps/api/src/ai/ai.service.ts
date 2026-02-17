import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from '../common/database.service';
import { LevelsService } from '../levels/levels.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AiService {
  constructor(
    private readonly db: DatabaseService,
    private readonly usersService: UsersService,
    private readonly levelsService: LevelsService
  ) {}

  async createWallet(userId: string) {
    const address = `lrn_${uuid().replace(/-/g, '').slice(0, 16)}`;
    await this.db.query(
      `INSERT INTO wallets (id, user_id, wallet_address, wallet_type, created_at)
       VALUES ($1, $2, $3, 'simulated', NOW()) ON CONFLICT (user_id) DO NOTHING`,
      [uuid(), userId, address]
    );
    return { address, type: 'simulated' };
  }

  async recommendNext(userId: string) {
    const interests = await this.db.query('SELECT interest_key FROM user_interests WHERE user_id = $1', [userId]);
    const firstInterest = interests.rows[0]?.interest_key ?? 'career';
    const content = await this.db.query(
      `SELECT id, title, description FROM content_items
       WHERE is_published = true AND (topic = $1 OR topic = 'career')
       ORDER BY created_at DESC LIMIT 3`,
      [firstInterest]
    );
    return {
      reason: `Based on your interest in ${firstInterest}, these picks strengthen your Level 1 foundation.`,
      items: content.rows
    };
  }

  async getProgress(userId: string) {
    return this.levelsService.getProgress(userId);
  }

  async setInterests(userId: string, interests: string[]) {
    return this.usersService.setInterests(userId, interests);
  }

  async chat(userId: string, message: string) {
    const lower = message.toLowerCase();
    let response = 'I am AILVA (AI Learning Voyage Assistant). Watch. Learn. Earn. What should we do next?';
    let toolResult: unknown = null;

    if (lower.includes('wallet')) {
      toolResult = await this.createWallet(userId);
      response = 'Great choice—your Learneum wallet-like account is ready. Credits are incentives, not guaranteed income.';
    } else if (lower.includes('interest')) {
      toolResult = { prompt: ['favorite fashion line', 'favorite YouTubers', 'deep space or deep sea?'] };
      response = 'Tell me your interests so I can recommend the best pathway.';
    } else if (lower.includes('recommend')) {
      toolResult = await this.recommendNext(userId);
      response = 'Here are your next quests and why they match your goals.';
    } else if (lower.includes('progress') || lower.includes('level')) {
      toolResult = await this.getProgress(userId);
      response = 'Nice momentum! Here is your progress toward the next level gate.';
    }

    await this.db.query(
      'INSERT INTO ai_sessions (id, user_id, user_message, assistant_message, tool_result, created_at) VALUES ($1, $2, $3, $4, $5::jsonb, NOW())',
      [uuid(), userId, message, response, JSON.stringify(toolResult)]
    );

    return { message: response, toolResult };
  }
}
