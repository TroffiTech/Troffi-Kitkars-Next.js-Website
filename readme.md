# Kitkars Next.js App — Deploy without Docker

Деплой Next.js приложения на продакшн-сервер без использования Docker-контейнеров.

## Архитектура деплоя

```

GitHub (ветка no-docker)
│
├── Build Job (CI раннер)
│ ├── npm ci
│ ├── npm run build
│ └── Паковка .next + node_modules → build.tar.gz
│
└── Deploy Job (CI раннер)
├── Копирование updater-scripts на сервер
├── Копирование build.tar.gz на сервер
└── SSH: скрипты обновления → распаковка → PM2 restart

```

## Структура репозитория

```

├── next-app/ # Next.js приложение
│ ├── package.json
│ ├── next.config.ts
│ └── ...
├── updater-scripts/ # Скрипты генерации JSON-хранилища
│ ├── updateContent.js # Точка входа
│ ├── utils/
│ └── package.json
└── .github/
└── workflows/
└── deploy-next-app.yml

```

## Серверная структура

```

/var/www/kitkars/
├── .env # Переменные окружения (CONTENT_PATH и др.)
├── content/ # JSON-хранилище (генерируется скриптами)
│ └── allProducts.json
├── shared-scripts/ # Скрипты обновления (копируются из репы)
│ └── updateContent.js
└── kitkars.ru/ # Приложение Next.js
├── .next/
├── node_modules/
├── package.json
└── public/

```

## CI/CD Pipeline

### Триггеры

- **Push** в ветку `no-docker`
- **Ручной запуск** через `workflow_dispatch`

### Build Job

1. Чекаут кода из ветки `no-docker`
2. Установка Node.js 20
3. `npm ci` в папке `next-app`
4. `npm run build` (next build)
5. Паковка артефакта: `.next`, `node_modules`, `public`, `package.json`
6. Загрузка артефакта `build.tar.gz` в GitHub Artifacts

### Deploy Job

1. Скачивание артефакта `build.tar.gz`
2. Чекаут репозитория (для доступа к `updater-scripts/`)
3. SCP копирование `updater-scripts/` → `/var/www/kitkars/shared-scripts/`
4. SCP копирование `build.tar.gz` → `/var/www/kitkars/kitkars.ru/`
5. SSH-деплой:
   - Проверка и установка PM2 (если нет)
   - Запуск `updateContent.js` для генерации JSON
   - Распаковка билда во временную папку
   - Остановка текущего процесса PM2
   - Атомарная замена файлов приложения
   - Запуск через `pm2 start npm --name kitkars-app -- start`

## Требования к серверу

- **Node.js 20+**
- **PM2** (установится автоматически при первом деплое)
- **nginx** (или другой reverse-proxy на порт 3000)
- Файл `/var/www/kitkars/.env` с переменными:
  ```env
  CONTENT_PATH=/var/www/kitkars/content
  # другие переменные для скриптов и приложения
  ```

## GitHub Secrets

Добавить в Settings → Secrets and variables → Actions:

| Secret            | Описание                      |
| ----------------- | ----------------------------- |
| `SERVER_HOST`     | IP или домен продакшн-сервера |
| `SERVER_USER`     | Пользователь для SSH          |
| `SSH_PRIVATE_KEY` | Приватный SSH-ключ            |
| `SSH_PORT`        | Порт SSH (по умолчанию 22)    |

## Первый деплой

1. Убедиться что на сервере создана структура директорий:

   ```bash
   mkdir -p /var/www/kitkars/{content,shared-scripts,kitkars.ru}
   ```

2. Положить `.env` в `/var/www/kitkars/.env`

3. Запушить код в ветку `no-docker`

4. CI/CD отработает автоматически

## Ручное управление на сервере

```bash
# Статус приложения
pm2 status

# Логи приложения
pm2 logs kitkars-app

# Перезапуск
pm2 restart kitkars-app

# Остановка
pm2 stop kitkars-app

# Запуск вручную (без CI)
cd /var/www/kitkars/kitkars.ru
pm2 start npm --name kitkars-app -- start

```
