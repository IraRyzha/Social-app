import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { ChatsController } from './chats.controller';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [ChatsController],
  providers: [ChatGateway, ChatsService, DatabaseService],
})
export class ChatsModule {}
