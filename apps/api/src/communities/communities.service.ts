import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/database.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CommunitiesService {
  constructor(private readonly db: DatabaseService) {}

  list() {
    return this.db.query('SELECT id, name, description FROM communities ORDER BY created_at DESC').then((r) => r.rows);
  }

  async join(userId: string, communityId: string) {
    await this.db.query(
      `INSERT INTO community_members (id, community_id, user_id, created_at)
       VALUES ($1, $2, $3, NOW()) ON CONFLICT (community_id, user_id) DO NOTHING`,
      [uuid(), communityId, userId]
    );
    return { joined: true };
  }

  async createPost(userId: string, communityId: string, body: string) {
    await this.db.query(
      `INSERT INTO posts (id, community_id, user_id, body, created_at)
       VALUES ($1, $2, $3, $4, NOW())`,
      [uuid(), communityId, userId, body]
    );
    return { posted: true };
  }
}
