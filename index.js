import { Telegraf } from 'telegraf';

const bot = new Telegraf('ТВОЙ_ТОКЕН_БОТА'); // Вставь свой токен

bot.start((ctx) => {
  ctx.reply('🚪 Готов войти в город?', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: 'Войти в город',
          web_app: { url: 'https://comein-game.vercel.app/' }
        }
      ]]
    }
  });
});

bot.launch();
console.log('Бот запущен');
