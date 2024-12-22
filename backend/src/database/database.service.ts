import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private pool: Pool;

  constructor(private configService: ConfigService) {
    this.pool = new Pool({
      connectionString: this.configService.get<string>('DATABASE_URL'),
    });
    // max: parseInt(process.env.DB_MAX_CONNECTIONS, 10) || 10,
    //   idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT, 10) || 30000,
  }

  async query(text: string, params?: any[]) {
    return this.pool.query(text, params);
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
