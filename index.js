const { Telegraf } = require('telegraf');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bote EE Snack Bot is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    "မင်္ဂလာပါ\nBote EE Snack Shop မှ ကြိုဆိုပါတယ်ရှင့်\n\nMenu လေးတွေ သေချာကြည့်ပြီး အေးအေးဆေးဆေး ရွေးချယ်မှာယူပေးပါ"
  );
});

bot.launch();

console.log("Bot is running...");
