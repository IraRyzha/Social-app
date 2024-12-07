import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from './chats.service';
import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
  namespace: '/chat',
  methods: ['GET', 'POST'],
})
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatsService: ChatsService) {
    console.log('ChatGateway створено');
  }

  afterInit(server: Server) {
    console.log('WebSocket сервер запущено' + server);
  }

  // Метод для обробки події надсилання повідомлення
  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() sendMessageDto: SendMessageDto) {
    // Викликаємо метод з chats.service.ts для збереження повідомлення
    const savedMessage = await this.chatsService.sendMessage(
      sendMessageDto.chatId,
      sendMessageDto.senderId,
      sendMessageDto.content
    );

    // Розсилаємо повідомлення всім клієнтам у кімнаті
    this.server.to(sendMessageDto.chatId).emit('newMessage', savedMessage);

    return savedMessage;
  }

  // Підключення клієнта до чату
  handleConnection(client: Socket) {
    const chatId = client.handshake.query.chatId as string;
    if (chatId) {
      client.join(chatId); // Додаємо клієнта до кімнати чату
      console.log(`Користувач підключився до чату: ${chatId}`);
    }
  }

  // Відключення клієнта
  handleDisconnect(client: Socket) {
    console.log(`Користувач відключився ${client}`);
  }
}
