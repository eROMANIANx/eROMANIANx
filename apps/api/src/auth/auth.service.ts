import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from '../common/database.service';
import { LoginDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwt: JwtService
  ) {}

  async signup(dto: SignupDto) {
    const exists = await this.db.query<{ id: string }>('SELECT id FROM users WHERE email = $1', [dto.email]);
    if (exists.rowCount) throw new ConflictException('Email already registered');

    const id = uuid();
    const passwordHash = await bcrypt.hash(dto.password, 10);
    await this.db.query(
      `INSERT INTO users (id, email, password_hash, role, created_at)
       VALUES ($1, $2, $3, 'learner', NOW())`,
      [id, dto.email, passwordHash]
    );
    await this.db.query(
      `INSERT INTO profiles (user_id, display_name, level, credits_balance, streak, is_minor, privacy_opt_in, created_at)
       VALUES ($1, $2, 1, 0, 0, false, false, NOW())`,
      [id, dto.name]
    );

    const token = await this.jwt.signAsync({ sub: id, email: dto.email, role: 'learner' });
    return { token };
  }

  async login(dto: LoginDto) {
    const user = await this.db.query<{ id: string; password_hash: string; role: string }>(
      'SELECT id, password_hash, role FROM users WHERE email = $1',
      [dto.email]
    );
    if (!user.rowCount) throw new UnauthorizedException('Invalid credentials');

    const row = user.rows[0];
    const match = await bcrypt.compare(dto.password, row.password_hash);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const token = await this.jwt.signAsync({ sub: row.id, email: dto.email, role: row.role });
    return { token };
  }

  async requestPasswordReset(email: string) {
    await this.db.query('INSERT INTO audit_logs (actor_id, action, metadata, created_at) VALUES (NULL, $1, $2::jsonb, NOW())', [
      'password_reset_requested',
      JSON.stringify({ email })
    ]);
    return { message: 'If this email exists, reset instructions were sent.' };
  }
}
