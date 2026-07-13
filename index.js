const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    "မင်္ဂလာပါ\nBote EE Snack Shop မှ ကြိုဆိုပါတယ်ရှင့်\n\nMenu လေးတွေ သေချာကြည့်ပြီး အေးအေးဆေးဆေး ရွေးချယ်မှာယူပေးပါ\n\nပို့ဆောင်မည့်အချိန် - 12 နာရီ၊ 3 နာရီ၊ 6 နာရီ"
  );
});

bot.launch();

console.log("Bot is running...");
