const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Render အတွက် Web Server
app.get('/', (req, res) => {
  res.send('Bote EE Snack Shop Bot is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Telegram Bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// Start Menu
bot.start((ctx) => {
  ctx.reply(
    `မင်္ဂလာပါ 👋

Bote EE Snack Shop မှ ကြိုဆိုပါတယ်ရှင့်

Menu လေးတွေ သေချာကြည့်ပြီး အေးအေးဆေးဆေး ရွေးချယ်မှာယူပေးပါ

ပို့ဆောင်မည့်အချိန် - 12 နာရီ၊ 3 နာရီ၊ 6 နာရီ`,
    Markup.keyboard([
      ['🍟 မုန့်အမျိုးအစားရွေးရန်'],
      ['📞 Admin နှင့်ဆက်သွယ်ရန်']
    ])
    .resize()
  );
});

// Menu Button
bot.hears('🍟 မုန့်အမျိုးအစားရွေးရန်', (ctx) => {
  ctx.reply(
    'ဘယ်လိုအမျိုးအစားလိုချင်ပါသလဲ\n\nအောက်တွင်ရွေးချယ်ပေးပါ',
    Markup.keyboard([
      ['🥔 အာလူးကြော်'],
      ['🥤 အချိုရည်'],
      ['🔙 Back']
    ])
    .resize()
  );
});

// Admin Button
bot.hears('📞 Admin နှင့်ဆက်သွယ်ရန်', (ctx) => {
  ctx.reply('Admin နှင့် ဆက်သွယ်ရန် - @YourAdminUsername');
});

// Back
bot.hears('🔙 Back', (ctx) => {
  ctx.reply(
    'Menu ပြန်ရွေးပါ',
    Markup.keyboard([
      ['🍟 မုန့်အမျိုးအစားရွေးရန်'],
      ['📞 Admin နှင့်ဆက်သွယ်ရန်']
    ])
    .resize()
  );
});

// Bot စတင်
bot.launch();

console.log('Bot is running...');
