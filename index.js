const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bote EE Snack Shop is Online 🟢');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const bot = new Telegraf(process.env.BOT_TOKEN);


// Start
bot.start((ctx) => {
  ctx.reply(
`🌶️ Bote EE Snack Shop မှ ကြိုဆိုပါတယ်ရှင့် 👋

😋 အရသာရှိတဲ့ Snack မျိုးစုံကို
လွယ်ကူမြန်ဆန်စွာ မှာယူနိုင်ပါပြီ။

🔥 အရသာကောင်း
✨ သန့်ရှင်းလတ်ဆတ်
📦 အဆင်ပြေတဲ့ ပို့ဆောင်မှု

ကြိုက်နှစ်သက်ရာ Menu ကိုရွေးပြီး
အခုပဲ မှာယူလိုက်ပါနော် ❤️

👇 အောက်က Menu ကိုရွေးပါ`,
    Markup.keyboard([
      ['🍿 Snack Menu ကြည့်မယ်'],
      ['🛒 မှာယူမယ်'],
      ['📞 Admin နှင့် ဆက်သွယ်ရန်']
    ]).resize()
  );
});


// Menu
bot.hears('🍿 Snack Menu ကြည့်မယ်', (ctx) => {
  ctx.reply(
`🍿 Bote EE Snack Menu

1️⃣ BBQ Flavor
2️⃣ Spicy Flavor 🌶️
3️⃣ Original Flavor 😋

မှာယူလိုတဲ့ Menu ကိုရွေးပါ`,
    Markup.keyboard([
      ['🔥 BBQ Flavor'],
      ['🌶️ Spicy Flavor'],
      ['🔙 ပင်မ Menu']
    ]).resize()
  );
});


// Order
bot.hears('🛒 မှာယူမယ်', (ctx) => {
  ctx.reply(
`🛒 မှာယူရန်

လိုချင်တဲ့ Snack အမျိုးအစားနဲ့
အရေအတွက်ကို ရေးပို့ပေးပါနော်။

ဥပမာ -
BBQ Flavor x 2 ထုပ်`
  );
});


// Admin
bot.hears('📞 Admin နှင့် ဆက်သွယ်ရန်', (ctx) => {
  ctx.reply(
`📞 Customer Service

မှာယူမှု၊ ဈေးနှုန်းနဲ့ Delivery အတွက်
Admin ကို ဆက်သွယ်နိုင်ပါတယ်။

@YourAdminUsername`
  );
});


// Back
bot.hears('🔙 ပင်မ Menu', (ctx) => {
  ctx.reply(
    'Menu ပြန်ရွေးပါ 👇',
    Markup.keyboard([
      ['🍿 Snack Menu ကြည့်မယ်'],
      ['🛒 မှာယူမယ်'],
      ['📞 Admin နှင့် ဆက်သွယ်ရန်']
    ]).resize()
  );
});


bot.launch();

console.log('Bote EE Snack Bot Running...');
