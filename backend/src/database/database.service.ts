import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private pool: Pool;

  constructor(private configService: ConfigService) {
    console.log(
      'DATABASE_URL:',
      this.configService.get<string>('DATABASE_URL')
    );
    this.pool = new Pool({
      connectionString: this.configService.get<string>('DATABASE_URL'),
      ssl: {
        rejectUnauthorized: false,
      },
    });
    // max: parseInt(process.env.DB_MAX_CONNECTIONS, 10) || 10,
    //   idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT, 10) || 30000,
  }

  async onModuleInit() {
    console.log('Running database initialization...');
    await this.runSQLFile(path.join(__dirname, 'init.sql'));
  }

  private async runSQLFile(filePath: string) {
    try {
      const sql = fs.readFileSync(filePath, 'utf-8'); // Читаємо SQL-файл
      await this.pool.query(sql); // Виконуємо SQL-файл
      console.log('Database initialization completed successfully!');
    } catch (error) {
      console.error('Error during database initialization:', error);
    }
  }

  async query(text: string, params?: any[]) {
    return this.pool.query(text, params);
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
