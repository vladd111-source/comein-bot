import { Telegraf } from 'telegraf';

// Токен бота
const bot = new Telegraf('8186603899:AAFHQl8fowxIWPFKtu9q6ZxK2z2-maTvbCk');

// Обработка команды /start
bot.start((ctx) => {
  const tgId = ctx.from.id;
  const username = ctx.from.username || '—';
  const source = ctx.startPayload || 'без метки';

  console.log(`🟢 Новый пользователь: ${tgId} (@${username}), источник: ${source}`);

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

// Запуск бота
bot.launch().then(() => {
  console.log('✅ Бот запущен');
});

// Обработка SIGINT и SIGTERM для Render
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
