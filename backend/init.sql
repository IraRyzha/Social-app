CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- base functional

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(100) UNIQUE NOT NULL, -- Email для автентифікації
  password_hash VARCHAR(255) NOT NULL, -- Хешований пароль
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Дата реєстрації
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE, -- Зв'язок із таблицею users
  user_name VARCHAR(100), -- Повне ім'я користувача
  avatar_url VARCHAR(255), -- URL аватара
  status VARCHAR(20) DEFAULT 'offline', -- Статус користувача
  bio TEXT, -- Біографія користувача
  followers_count INT DEFAULT 0, -- Кількість підписників
  following_count INT DEFAULT 0, -- Кількість підписок
  posts_count INT DEFAULT 0, -- Кількість постів
  points INT DEFAULT 0, -- Кількість балів
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
  language VARCHAR(10) DEFAULT 'en', -- Мова
  notifications_enabled BOOLEAN DEFAULT TRUE, -- Налаштування сповіщень
  privacy_level VARCHAR(20) DEFAULT 'public' -- Рівень приватності (наприклад, "public", "private")
);

-- bank functional

CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  balance DECIMAL(18, 8) DEFAULT 0, -- Баланс гаманця
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_wallet_id UUID REFERENCES wallets(id) ON DELETE SET NULL, -- Відправник
  receiver_wallet_id UUID REFERENCES wallets(id) ON DELETE SET NULL, -- Отримувач
  amount DECIMAL(18, 8) NOT NULL, -- Сума транзакції
  status VARCHAR(20) DEFAULT 'pending', -- Статус транзакції (наприклад, 'pending', 'completed')
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tokens (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL, -- Назва токена (наприклад, TokenA, TokenB)
  exchange_rate DECIMAL(10, 4) NOT NULL DEFAULT 1.0 -- Обмінний курс до базового токена
);

CREATE TABLE wallet_balances (
  wallet_id UUID REFERENCES wallets(id) ON DELETE CASCADE, -- Відсилання до конкретного гаманця
  token_id INT REFERENCES tokens(id) ON DELETE CASCADE, -- Тип токена, який зберігається у гаманці
  balance DECIMAL(18, 8) DEFAULT 0, -- Баланс гаманця в певному токені
  PRIMARY KEY (wallet_id, token_id)
);

CREATE TABLE swap_transactions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  from_token_id INT REFERENCES tokens(id) ON DELETE SET NULL,
  to_token_id INT REFERENCES tokens(id) ON DELETE SET NULL,
  from_amount DECIMAL(18, 8) NOT NULL, -- Сума токенів, що обмінюється
  to_amount DECIMAL(18, 8) NOT NULL, -- Сума токенів, отриманих у результаті свапу
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lender_wallet_id UUID REFERENCES wallets(id) ON DELETE SET NULL, -- ID гаманця кредитора
  borrower_wallet_id UUID REFERENCES wallets(id) ON DELETE SET NULL, -- ID гаманця позичальника
  token_id INT REFERENCES tokens(id) ON DELETE CASCADE, -- Тип токена
  amount DECIMAL(18, 8) NOT NULL, -- Сума позики
  interest_rate DECIMAL(5, 2) DEFAULT 5.0, -- Відсоткова ставка (наприклад, 5%)
  due_date TIMESTAMP, -- Термін погашення
  status VARCHAR(20) DEFAULT 'active', -- Статус позики (active, repaid, defaulted)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loan_repayments (
  id SERIAL PRIMARY KEY,
  loan_id UUID REFERENCES loans(id) ON DELETE CASCADE, -- ID позики
  amount DECIMAL(18, 8) NOT NULL, -- Сума виплати
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Дата виплати
);

