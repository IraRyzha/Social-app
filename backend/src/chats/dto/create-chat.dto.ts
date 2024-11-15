export class CreateChatDto {
  isGroup: boolean;
  memberIds: string[]; // Массив userId учасників чату
}
