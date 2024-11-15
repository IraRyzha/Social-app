type IChat = {
  chat_id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  last_message: string;
  unread_count: number;
  updated_at: string;
};

type IChatInfo = {
  chat_id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
};

interface IMessage {
  id: string; // Унікальний ідентифікатор повідомлення
  sender_id: string; // Ідентифікатор відправника
  content: string; // Текст повідомлення
  is_read: boolean; // Статус прочитання повідомлення
  created_at: string; // Час створення повідомлення у форматі ISO 8601
}

export type { IChat, IChatInfo, IMessage };
