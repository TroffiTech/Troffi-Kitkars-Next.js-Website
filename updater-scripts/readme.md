# Скрипты обновления контента

Скрипты загружают данные из WooCommerce API и генерируют JSON-файлы для фронтенда.

## Структура

```
updater-scripts/
├── updateContent.js        # Главный скрипт
├── utils/                  # Вспомогательные функции
│   ├── loadAllProducts.js
│   ├── loadCategories.js
│   ├── writeAllProductsFile.js
│   ├── writeCategoriesThreeFile.js
│   ├── writeRobotsTxtFile.js
│   ├── writeSitemapFile.js
│   └── ...
```

## Установка зависимостей

```bash
cd updater-scripts
npm install
```

## Запуск

Скрипт принимает два параметра:

1. Путь к `.env` файлу
2. Путь к директории для сохранения данных

```bash
# Из папки со скриптами
node updateContent.js /путь/к/.env /путь/к/content-data

# Пример
node updateContent.js /var/www/periphery/site_1/.env /var/www/periphery/site_1/content-data
```

## Настройка Cron (каждые 15 минут)

```bash
# /etc/cron.d/update-content
*/15 * * * * root cd /var/www/periphery/shared-scripts && node updateContent.js /var/www/periphery/site_1/.env /var/www/periphery/site_1/content-data >> /var/log/content-update.log 2>&1
```

## Что делают скрипты

1. Загружают все товары из WooCommerce API
2. Загружают все категории
3. Строят дерево категорий
4. Генерируют sitemap.xml
5. Создают robots.txt
6. Сохраняют всё в указанную директорию
