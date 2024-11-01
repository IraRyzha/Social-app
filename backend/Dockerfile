# Зазначте базовий образ
FROM node:16-alpine

# Встановіть робочу директорію
WORKDIR /app

# Копіюйте файли та встановіть залежності
COPY package*.json ./
RUN npm install

# Копіюйте весь код
COPY . .

# Запустіть додаток
CMD ["npm", "run", "start:dev"]
