import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { ChatsController } from './chats.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ChatsController],
  providers: [ChatsService, DatabaseService],
})
export class ChatsModule {}
