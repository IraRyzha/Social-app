CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Створення таблиць
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profiles (
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

CREATE TABLE followers (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, follower_id)
);

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_settings (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  language VARCHAR(10) DEFAULT 'en',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  privacy_level VARCHAR(20) DEFAULT 'public'
);

CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  balance DECIMAL(18, 8) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_wallet_id UUID REFERENCES wallets(id) ON DELETE SET NULL,
  receiver_wallet_id UUID REFERENCES wallets(id) ON DELETE SET NULL,
  amount DECIMAL(18, 8) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tokens (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  exchange_rate DECIMAL(10, 4) NOT NULL DEFAULT 1.0
);

CREATE TABLE wallet_balances (
  wallet_id UUID REFERENCES wallets(id) ON DELETE CASCADE,
  token_id INT REFERENCES tokens(id) ON DELETE CASCADE,
  balance DECIMAL(18, 8) DEFAULT 0,
  PRIMARY KEY (wallet_id, token_id)
);

CREATE TABLE swap_transactions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  from_token_id INT REFERENCES tokens(id) ON DELETE SET NULL,
  to_token_id INT REFERENCES tokens(id) ON DELETE SET NULL,
  from_amount DECIMAL(18, 8) NOT NULL,
  to_amount DECIMAL(18, 8) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lender_wallet_id UUID REFERENCES wallets(id) ON DELETE SET NULL,
  borrower_wallet_id UUID REFERENCES wallets(id) ON DELETE SET NULL,
  token_id INT REFERENCES tokens(id) ON DELETE CASCADE,
  amount DECIMAL(18, 8) NOT NULL,
  interest_rate DECIMAL(5, 2) DEFAULT 5.0,
  due_date TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loan_repayments (
  id SERIAL PRIMARY KEY,
  loan_id UUID REFERENCES loans(id) ON DELETE CASCADE,
  amount DECIMAL(18, 8) NOT NULL,
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка тестових даних
INSERT INTO users (id, email, password_hash)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'user1@example.com', 'hashedpassword1'),
  ('22222222-2222-2222-2222-222222222222', 'user2@example.com', 'hashedpassword2'),
  ('33333333-3333-3333-3333-333333333333', 'user3@example.com', 'hashedpassword3');

INSERT INTO profiles (user_id, user_name, avatar_url, status, bio, followers_count, following_count, posts_count, points)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'tom', 'sun', 'online', 'Bio for user tom', 10, 5, 3, 100),
  ('22222222-2222-2222-2222-222222222222', 'nina', 'rainbow', 'offline', 'Bio for user nina', 15, 10, 2, 200),
  ('33333333-3333-3333-3333-333333333333', 'xxxoopppp', 'fire', 'offline', 'Bio for user xxxoopppp', 8, 12, 4, 150);
  ('44444444-4444-4444-4444-444444444444', 'kit', 'sprout', 'offline', 'Bio for user kit', 5, 15, 3, 10);
  ('55555555-5555-5555-5555-555555555555', 'noynaym', 'user', 'offline', 'Bio for user noynaym', 9, 2, 1, 35);

INSERT INTO posts (user_id, content, created_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'This is the first post by User One.', '2024-11-05 10:00:00'),
  ('11111111-1111-1111-1111-111111111111', 'Another post by User One.', '2024-11-05 12:00:00'),
  ('11111111-1111-1111-1111-111111111111', 'User One is posting again.', '2024-11-05 14:00:00'),
  ('22222222-2222-2222-2222-222222222222', 'User Two first post.', '2024-11-05 11:00:00'),
  ('22222222-2222-2222-2222-222222222222', 'Another post by User Two.', '2024-11-05 13:00:00'),
  ('33333333-3333-3333-3333-333333333333', 'User Three is here!', '2024-11-05 09:00:00'),
  ('33333333-3333-3333-3333-333333333333', 'A second post by User Three.', '2024-11-05 11:30:00'),
  ('44444444-4444-4444-4444-444444444444', 'User Three has more to say.', '2024-11-05 14:30:00'),
  ('55555555-5555-5555-5555-555555555555', 'User Three final post for now.', '2024-11-05 16:00:00');
