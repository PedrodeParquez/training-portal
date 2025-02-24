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

## Методы API

| Метод  | Запрос               | Описание                                | Требуется аутентификация |
| ------ | -------------------- | --------------------------------------- | ------------------------ |
| POST   | `/api/auth/register` | Регистрация нового пользователя         | Нет                      |
| POST   | `/api/auth/login`    | Вход и получение JWT-токена             | Нет                      |
| GET    | `/api/users/getUser` | Получение профиля текущего пользователя | Да                       |
| DELETE | `/api/users/:id`     | Удаление пользователя                   | Да                       |

## Запуск через Docker

### 1️⃣ Сборка и запуск контейнеров

```bash
docker-compose up --build
```

### 2️⃣ Остановка контейнеров

```bash
docker-compose down
```
