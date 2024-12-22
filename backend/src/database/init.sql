CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_name VARCHAR(100),
  avatar_name VARCHAR(100),
  status VARCHAR(20) DEFAULT 'offline',
  bio TEXT,
  followers_count INT DEFAULT 0,
  following_count INT DEFAULT 0,
  posts_count INT DEFAULT 0,
  points INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS followers (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, follower_id)
);

CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS post_categories (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  category_id INT REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

CREATE TABLE IF NOT EXISTS likes (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, post_id)
);

CREATE TABLE IF NOT EXISTS chats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  is_group BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chat_members (
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (chat_id, user_id)
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),      -- Унікальний ідентифікатор повідомлення
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE, -- Ідентифікатор чату
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE, -- Ідентифікатор відправника
  content TEXT NOT NULL,                               -- Текст повідомлення
  is_read BOOLEAN DEFAULT FALSE,                      -- Чи прочитане повідомлення
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP       -- Дата створення повідомлення
);

CREATE TABLE  IF NOT EXISTS user_settings (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  language VARCHAR(10) DEFAULT 'en',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  privacy_level VARCHAR(20) DEFAULT 'public'
);

INSERT INTO categories (name)
VALUES 
    ('lifestyle'),
    ('memes'),
    ('business'),
    ('technology'),
    ('ai'),
    ('programming'),
    ('blockchain'),
    ('crypto'),
    ('job'),
    ('art'),
    ('science'),
    ('sports'),
    ('travel'),
    ('self-improvement'),
    ('health'),
    ('news'),
    ('psychology'),
    ('history')
ON CONFLICT (name) DO NOTHING;



