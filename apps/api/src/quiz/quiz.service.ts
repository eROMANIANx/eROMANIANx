import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/database.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class QuizService {
  constructor(private readonly db: DatabaseService) {}

  async submit(userId: string, quizId: string, answers: Record<string, string>) {
    const questions = await this.db.query<{ id: string; correct_answer: string }>(
      'SELECT id, correct_answer FROM quiz_questions WHERE quiz_id = $1',
      [quizId]
    );
    const total = questions.rowCount;
    const correct = questions.rows.filter((q) => answers[q.id] === q.correct_answer).length;
    const passed = total > 0 && correct / total >= 0.7;

    await this.db.query(
      `INSERT INTO quiz_attempts (id, user_id, quiz_id, score, passed, answers, created_at)
       VALUES ($1, $2, $3, $4, $5, $6::jsonb, NOW())`,
      [uuid(), userId, quizId, correct, passed, JSON.stringify(answers)]
    );

    if (passed) {
      await this.db.query(
        `INSERT INTO reward_ledger (id, user_id, event_type, credits_delta, metadata, created_at)
         VALUES ($1, $2, 'quiz_pass',
          COALESCE((SELECT credits FROM reward_rules WHERE event_type = 'quiz_pass' LIMIT 1), 10),
          $3::jsonb, NOW())`,
        [uuid(), userId, JSON.stringify({ quizId, score: correct, total })]
      );
      await this.db.query(
        'UPDATE profiles SET credits_balance = (SELECT COALESCE(SUM(credits_delta), 0) FROM reward_ledger WHERE user_id = $1) WHERE user_id = $1',
        [userId]
      );
    }

    return { passed, score: correct, total };
  }
}
