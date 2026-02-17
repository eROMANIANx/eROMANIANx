import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from '../common/database.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly db: DatabaseService) {}

  list() {
    return this.db.query('SELECT id, title, description, level_required FROM projects ORDER BY created_at DESC').then((r) => r.rows);
  }

  async submit(userId: string, body: { projectId: string; submissionText?: string; submissionLink?: string; fileUrl?: string }) {
    await this.db.query(
      `INSERT INTO project_submissions (id, project_id, user_id, submission_text, submission_link, file_url, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, 'submitted', NOW())`,
      [uuid(), body.projectId, userId, body.submissionText || null, body.submissionLink || null, body.fileUrl || null]
    );
    return { submitted: true };
  }
}
