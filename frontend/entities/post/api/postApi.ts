import { IPost } from "../model/types";

export const getPosts = async (): Promise<IPost[]> => {
  const posts: IPost[] = [
    {
      id: "1",
      user: {
        name: "Olha Ivanenko",
        photo: "https://randomuser.me/api/portraits/women/1.jpg",
      },
      text: "Сьогодні чудовий день! Люблю цю осінь 🌞🍂",
      date: "2024-11-01T09:30:00Z",
      flashs: 120,
    },
    {
      id: "2",
      user: {
        name: "Andriy Shevchenko",
        photo: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      text: "Провів чудовий час на природі! Свіже повітря робить дива.",
      date: "2024-11-02T12:15:00Z",
      flashs: 98,
    },
    {
      id: "3",
      user: {
        name: "Iryna Bondar",
        photo: "https://randomuser.me/api/portraits/women/3.jpg",
      },
      text: "Щастя – це коли у тебе є час для себе та своїх рідних ❤️",
      date: "2024-11-03T15:00:00Z",
      flashs: 230,
    },
    {
      id: "4",
      user: {
        name: "Petro Khmil",
        photo: "https://randomuser.me/api/portraits/men/4.jpg",
      },
      text: "Кава зранку – найкращий початок дня ☕️",
      date: "2024-11-03T08:45:00Z",
      flashs: 47,
    },
    {
      id: "5",
      user: {
        name: "Svitlana Kovalenko",
        photo: "https://randomuser.me/api/portraits/women/5.jpg",
      },
      text: "Займаюся спортом і почуваюся чудово! Спорт – це життя 🏃‍♀️",
      date: "2024-11-04T07:00:00Z",
      flashs: 76,
    },
    {
      id: "6",
      user: {
        name: "Svitlanaa Kovalenko",
        photo: "https://randomuser.me/api/portraits/women/5.jpg",
      },
      text: "Займаюся спортом і почуваюся чудово! Спорт – це життя 🏃‍♀️",
      date: "2024-11-04T07:00:00Z",
      flashs: 76,
    },
    {
      id: "7",
      user: {
        name: "Svitlanaaa Kovalenko",
        photo: "https://randomuser.me/api/portraits/women/5.jpg",
      },
      text: "Займаюся спортом і почуваюся чудово! Спорт – це життя 🏃‍♀️",
      date: "2024-11-04T07:00:00Z",
      flashs: 76,
    },
  ];

  return posts;
};
