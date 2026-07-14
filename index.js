const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Render health check
app.get('/', (req, res) => {
  res.send('Bote EE Snack Shop Bot is running 🟢');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// Telegram Bot
const bot = new Telegraf(process.env.BOT_TOKEN);


// Main Menu Function
function mainMenu() {
  return Markup.keyboard([
    ['🍿 Snack Menu ကြည့်မယ်'],
    ['🛒 စျေးဝယ်အိတ်'],
    ['📞 Admin နှင့် ဆက်သွယ်ရန်']
  ]).resize();
}


// Start
bot.start((ctx) => {
  ctx.reply(
`🌶️ Bote EE Snack Shop မှ ကြိုဆိုပါတယ်ရှင့် 👋

😋 အရသာရှိတဲ့ Snack မျိုးစုံကို
လွယ်ကူမြန်ဆန်စွာ မှာယူနိုင်ပါပြီ။

🔥 အရသာကောင်း
✨ သန့်ရှင်းလတ်ဆတ်
📦 အဆင်ပြေတဲ့ Delivery

ကြိုက်နှစ်သက်ရာ Menu ကိုရွေးပြီး
အခုပဲ မှာယူလိုက်ပါနော် ❤️`,
    mainMenu()
  );
});


// Snack Menu
bot.hears(/Snack Menu/, (ctx) => {
  ctx.reply(
`🍿 Bote EE Snack Menu

🍟 အာလူးကြော် အချို
💰 1 ထုပ် - 1,000 MMK

🔥 အာလူးကြော် အစပ်
💰 1 ထုပ် - 1,500 MMK

ကြိုက်တဲ့အရသာကို ရွေးပါ 👇`,
    Markup.keyboard([
      ['🍟 အာလူးကြော် အချို'],
      ['🔥 အာလူးကြော် အစပ်'],
      ['🔙 ပင်မ Menu']
    ]).resize()
  );
});


// BBQ
bot.hears(/အာလူးကြော် အချို/, (ctx) => {
  ctx.reply(
`🍟 အာလူးကြော် အချို

😋 အရသာကောင်းပြီး လူကြိုက်များတဲ့ အာလူးကြော်ပါ ပါ။

💰 ဈေးနှုန်း
1 ထုပ် - 1,000 MMK

မှာယူချင်ရင် အောက်က Button ကိုနှိပ်ပါ 👇`,
    Markup.keyboard([
      ['🛒အိတ်ထဲထည့်မယ်'],
      ['🔙 ပင်မ Menu']
    ]).resize()
  );
});


// Spicy
bot.hears(/အာလူးကြော် အစပ်/, (ctx) => {
  ctx.reply(
`🔥 အာလူးကြော် အစပ်

🌶️ စပ်စပ်လေး ကြိုက်သူတွေအတွက် အထူးသင့်တော်ပါတယ်။

💰 ဈေးနှုန်း
1 ထုပ် - 1,500 MMK

မှာယူချင်ရင် အောက်က Button ကိုနှိပ်ပါ 👇`,
    Markup.keyboard([
      ['🛒 အိတ်ထဲထည့်မယ်'],
      ['🔙 ပင်မ Menu']
    ]).resize()
  );
});


// Order
bot.hears(/ဝယ်ယူမယ်|မှာယူမယ်/, (ctx) => {
  ctx.reply(
`🛒 မှာယူရန်

လိုချင်တဲ့ Snack အမျိုးအစားနဲ့
အရေအတွက်ကို ရေးပို့ပေးပါနော်။

ဥပမာ 👇

🌶️ BBQ Flavor x 2 ထုပ်`
  );
});

// Shopping Bag
bot.hears('🛒 စျေးဝယ်အိတ်', (ctx) => {
  ctx.reply(
`🛒 သင့်စျေးဝယ်အိတ်

အခုအိတ်ထဲမှာ ပစ္စည်းမရှိသေးပါ။

🍿 Menu ထဲက ပစ္စည်းရွေးပြီး
စျေးဝယ်အိတ်ထဲ ထည့်နိုင်ပါတယ်။`
  );
});

// Admin
bot.hears(/Admin/, (ctx) => {
  ctx.reply(
`📞 Customer Service

မှာယူမှု၊ ဈေးနှုန်းနဲ့ Delivery အတွက်
Admin ကို ဆက်သွယ်နိုင်ပါတယ်။

@YourAdminUsername`
  );
});


// Back
bot.hears(/ပင်မ Menu/, (ctx) => {
  ctx.reply(
    '🏠 Main Menu',
    mainMenu()
  );
});


// Launch
bot.launch();

console.log('Bote EE Snack Bot Running 🚀');
