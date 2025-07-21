import express from 'express';
import { Telegraf } from 'telegraf';
import fetch from 'node-fetch';

// Токен Telegram бота
const bot = new Telegraf('8186603899:AAFHQl8fowxIWPFKtu9q6ZxK2z2-maTvbCk');

// URL скрипта Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyshOjBFW9vK32eP2DA8BgqpW9dsIgpAFKmntpC5UywJyV__Das1-1lBnQ_M-lnB-r7/exec';

// Обработка команды /start
bot.start(async (ctx) => {
  const tgId = ctx.from.id;
  const username = ctx.from.username || '—';
  const source = ctx.startPayload || 'без метки';
  const timestamp = new Date().toISOString();

  console.log(`🟢 Новый пользователь: ${tgId} (@${username}), источник: ${source}`);

  // Отправка данных в Google Таблицу
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ tgId, username, source, timestamp }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('✅ Данные отправлены в Google Sheets');
  } catch (err) {
    console.error('❌ Ошибка отправки в Google Sheets:', err);
  }

  ctx.reply('🚪 Готов войти в город?', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: '🧭 Войти в город',
          web_app: {
            url: 'https://comein-game.vercel.app/'
          }
        }
      ]]
    }
  });
});

// Настройка Express и Webhook
const app = express();
app.use(bot.webhookCallback('/secret-path'));

// Установить Webhook (вставь свой Render-домен)
bot.telegram.setWebhook('https://comein-bot.onrender.com/secret-path');

// Простой пинг
app.get('/', (req, res) => res.send('✅ Бот работает через Webhook'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер слушает на порту ${PORT}`);
});
