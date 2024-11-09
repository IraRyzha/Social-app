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

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE post_categories (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  category_id INT REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
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

-- Додавання категорій
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

-- Додавання користувачів
INSERT INTO users (id, email, password_hash)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'tom@example.com', 'hashedpassword1'),
  ('22222222-2222-2222-2222-222222222222', 'nina@example.com', 'hashedpassword2'),
  ('33333333-3333-3333-3333-333333333333', 'user3@example.com', 'hashedpassword3'),
  ('44444444-4444-4444-4444-444444444444', 'xxxoopppp@example.com', 'hashedpassword4'),
  ('55555555-5555-5555-5555-555555555555', 'noynaym@example.com', 'hashedpassword5'),
  ('66666666-6666-6666-6666-666666666666', 'user@example.com', 'hashedpassword6');

-- Додавання профілів із правильними кількостями постів, підписок і підписників
INSERT INTO profiles (user_id, user_name, avatar_name, status, bio, followers_count, following_count, posts_count, points)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'tom', 'sun', 'online', 'Bio for user tom', 3, 2, 3, 100), -- 3 підписники, 2 підписки, 3 пости
  ('22222222-2222-2222-2222-222222222222', 'nina', 'rainbow', 'offline', 'Bio for user nina', 2, 2, 2, 200), -- 2 підписники, 2 підписки, 2 пости
  ('33333333-3333-3333-3333-333333333333', 'xxxoopppp', 'fire', 'offline', 'Bio for user xxxoopppp', 2, 2, 2, 150), -- 2 підписники, 2 підписки, 2 пости
  ('44444444-4444-4444-4444-444444444444', 'kit', 'sprout', 'offline', 'Bio for user kit', 1, 1, 1, 10), -- 1 підписник, 1 підписка, 1 пост
  ('55555555-5555-5555-5555-555555555555', 'noynaym', 'user', 'offline', 'Bio for user noynaym', 2, 1, 1, 35), -- 2 підписники, 1 підписка, 1 пост
  ('66666666-6666-6666-6666-666666666666', 'user', 'user', 'offline', 'Bio for user 6666', 1, 0, 1, 1); -- 1 підписник, 0 підписок, 1 пост

-- Додавання підписок у таблицю followers
INSERT INTO followers (user_id, follower_id)
VALUES
  -- Підписники для користувача 'tom' (3 підписники, 2 підписки)
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222'), -- nina підписана на tom
  ('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333'), -- xxxoopppp підписаний на tom
  ('11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444'), -- kit підписаний на tom

  -- Підписники для користувача 'nina' (2 підписники, 2 підписки)
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111'), -- tom підписаний на nina
  ('22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333'), -- xxxoopppp підписаний на nina

  -- Підписники для користувача 'xxxoopppp' (2 підписники, 2 підписки)
  ('33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444'), -- kit підписаний на xxxoopppp
  ('33333333-3333-3333-3333-333333333333', '55555555-5555-5555-5555-555555555555'), -- noynaym підписаний на xxxoopppp

  -- Підписники для користувача 'kit' (1 підписник, 1 підписка)
  ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111'), -- tom підписаний на kit

  -- Підписники для користувача 'noynaym' (2 підписники, 1 підписка)
  ('55555555-5555-5555-5555-555555555555', '33333333-3333-3333-3333-333333333333'), -- xxxoopppp підписаний на noynaym
  ('55555555-5555-5555-5555-555555555555', '66666666-6666-6666-6666-666666666666'), -- user підписаний на noynaym

  -- Підписники для користувача 'user' (1 підписник, 0 підписок)
  ('66666666-6666-6666-6666-666666666666', '55555555-5555-5555-5555-555555555555'); -- noynaym підписаний на user


INSERT INTO posts (id, user_id, content, created_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Exploring the latest trends in AI and how they’re reshaping our world.', '2024-11-05 10:00:00'),
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'The impact of blockchain technology on modern business models.', '2024-11-05 12:00:00'),
  ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Why self-improvement is key to success in any field.', '2024-11-05 14:00:00'),
  ('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'Tips for maintaining a balanced lifestyle despite a busy schedule.', '2024-11-05 11:00:00'),
  ('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'Loving the new trends in travel this year! Where are you heading next?', '2024-11-05 13:00:00'),
  ('66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'Just watched an amazing documentary on space science. Mind blown!', '2024-11-05 09:00:00'),
  ('77777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', 'Cryptocurrency and its potential to disrupt traditional finance.', '2024-11-05 11:30:00'),
  ('88888888-8888-8888-8888-888888888888', '44444444-4444-4444-4444-444444444444', 'Exploring abstract art and its influence on my creative process.', '2024-11-05 14:30:00'),
  ('99999999-9999-9999-9999-999999999999', '55555555-5555-5555-5555-555555555555', 'Mental health tips for dealing with stress at work.', '2024-11-05 16:00:00'),
  ('00000000-0000-0000-0000-000000000000', '66666666-6666-6666-6666-666666666666', 'New job opportunities in the tech industry. Exciting times ahead!', '2024-11-06 17:00:00');

-- Додавання категорій для постів у post_categories
INSERT INTO post_categories (post_id, category_id)
VALUES
  ('11111111-1111-1111-1111-111111111111', (SELECT id FROM categories WHERE name = 'ai')),
  ('11111111-1111-1111-1111-111111111111', (SELECT id FROM categories WHERE name = 'technology')),
  ('22222222-2222-2222-2222-222222222222', (SELECT id FROM categories WHERE name = 'blockchain')),
  ('22222222-2222-2222-2222-222222222222', (SELECT id FROM categories WHERE name = 'business')),
  ('33333333-3333-3333-3333-333333333333', (SELECT id FROM categories WHERE name = 'self-improvement')),
  ('44444444-4444-4444-4444-444444444444', (SELECT id FROM categories WHERE name = 'lifestyle')),
  ('44444444-4444-4444-4444-444444444444', (SELECT id FROM categories WHERE name = 'health')),
  ('55555555-5555-5555-5555-555555555555', (SELECT id FROM categories WHERE name = 'travel')),
  ('66666666-6666-6666-6666-666666666666', (SELECT id FROM categories WHERE name = 'science')),
  ('77777777-7777-7777-7777-777777777777', (SELECT id FROM categories WHERE name = 'crypto')),
  ('77777777-7777-7777-7777-777777777777', (SELECT id FROM categories WHERE name = 'business')),
  ('88888888-8888-8888-8888-888888888888', (SELECT id FROM categories WHERE name = 'art')),
  ('99999999-9999-9999-9999-999999999999', (SELECT id FROM categories WHERE name = 'health')),
  ('99999999-9999-9999-9999-999999999999', (SELECT id FROM categories WHERE name = 'psychology')),
  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM categories WHERE name = 'job')),
  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM categories WHERE name = 'technology'));


