# Training portal

**Training portal** - это RESTful API, разработанный с использованием Node.js, Express, TypeScript и MongoDB.

## Установка

### 1️⃣ Клонирование репозитория

```bash
git clone https://github.com/PedrodeParquez/training-portal
cd training-portal
```

### 2️⃣ Установка зависимостей

```bash
yarn install
```

### 3️⃣ Настройка переменных окружения

Создайте файл `.env` в корневой директории проекта и укажите:

```bash
MONGO_URI="mongodb://mongo:27017/database"
JWT_SECRET="secret"
PORT=3000
```

## Запуск сервера

### 1️⃣ Запуск в режиме разработки

```bash
yarn run dev
```

Сервер будет доступен по адресу: [http://localhost:3000](http://localhost:3000).

### 2️⃣ Запуск с использованием Docker

```bash
docker-compose up --build
```

Это запустит контейнеры сервера и MongoDB.

## Запуск через Docker

### 1️⃣ Сборка и запуск контейнеров

```bash
cd deploy
docker-compose up --build
```

### 2️⃣ Остановка контейнеров

```bash
docker-compose down
```
