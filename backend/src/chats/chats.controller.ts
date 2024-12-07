import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { SendMessageDto } from './dto/send-message.dto';
// import { CreateChatDto, SendMessageDto } from './dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatService: ChatsService) {}

  @Post()
  async createChat(@Body() createChatDto: CreateChatDto) {
    const { isGroup, memberIds } = createChatDto;
    return await this.chatService.createChat(isGroup, memberIds);
  }

  @Get('user/:userId')
  async getUserChats(@Param('userId') userId: string) {
    return await this.chatService.getUserChats(userId);
  }

  @Get(':chatId/messages')
  async getChatMessages(@Param('chatId') chatId: string) {
    return await this.chatService.getChatMessages(chatId);
  }

  @Post(':chatId/info')
  async getChatInfo(
    @Param('chatId') chatId: string,
    @Body('userId') userId: string // Отримуємо userId з тіла запиту
  ) {
    const chatInfo = await this.chatService.getChatInfo(chatId, userId);

    if (!chatInfo) {
      throw new NotFoundException('Chat not found');
    }

    return chatInfo;
  }

  @Post(':chatId/messages')
  async sendMessage(
    @Param('chatId') chatId: string,
    @Body() sendMessageDto: SendMessageDto
  ) {
    console.log(sendMessageDto);
    const { senderId, content } = sendMessageDto;

    return await this.chatService.sendMessage(chatId, senderId, content);
  }
}
