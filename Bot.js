const { Telegraf } = require('telegraf');
require('dotenv').config();
const MarkUp = require('telegraf/markup');
const data = require('./data');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
  ctx.reply(
    `Прывітанне, паважаны ${ctx.message.from.first_name}! Цябе вітае дэма-версія бота, які дапамагае ўспомніць(а некаторым і даведацца), што адбылося ў той ці іншы год у гісторыі Беларусі.`,
    MarkUp.keyboard([
      ['862', '1009'],
      ['1385', '1569'],
    ])
      .resize()
      .extra()
  )
);
bot.on('text', (ctx) => {
  Object.keys(data).includes(ctx.message.text) ? null : ctx.reply('На жаль, гэта толькі дэма-версія і бот ведае няшмат дат');
  Object.entries(data).forEach((item) => {
    if (item[0] === ctx.message.text) {
      ctx.reply(item[1]);
    }
  });
});
bot.launch();

console.log('Бот запушчаны');
