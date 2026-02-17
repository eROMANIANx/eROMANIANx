import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async getMe(userId: string) {
    const profile = await this.db.query(
      `SELECT u.id, u.email, p.display_name, p.level, p.streak, p.credits_balance, p.is_minor, p.privacy_opt_in
       FROM users u JOIN profiles p ON p.user_id = u.id WHERE u.id = $1`,
      [userId]
    );
    const interests = await this.db.query('SELECT interest_key FROM user_interests WHERE user_id = $1', [userId]);
    return { ...profile.rows[0], interests: interests.rows.map((r: any) => r.interest_key) };
  }

  async setInterests(userId: string, interests: string[]) {
    await this.db.query('DELETE FROM user_interests WHERE user_id = $1', [userId]);
    for (const interest of interests) {
      await this.db.query('INSERT INTO user_interests (user_id, interest_key) VALUES ($1, $2)', [userId, interest]);
    }
    return { interests };
  }
}
