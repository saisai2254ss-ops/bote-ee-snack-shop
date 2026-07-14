const { Telegraf, Markup } = require('telegraf');
const express = require('express');
let cart = {};
let waitingForQty = {};
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
  const userId = ctx.from.id;

  waitingForQty[userId] = true;
  
  ctx.reply(
`🍟 အာလူးကြော် အချို

😋 အရသာကောင်းပြီး လူကြိုက်များတဲ့ အာလူးကြော်ပါ ပါ။

💰 ဈေးနှုန်း
1 ထုပ် - 1,000 MMK

မှာယူချင်ရင် အောက်မှ အရေအတွက်ကို ရေးပါ 👇`,
    Markup.keyboard([
      ['🛒 စျေးဝယ်အိတ်'],
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
      ['🛒 စျေးဝယ်အိတ်'],
      ['🔙 ပင်မ Menu']
    ]).resize()
  );
});


// Order
bot.hears('🛒 စျေးဝယ်အိတ်', (ctx) => {

  const userId = ctx.from.id;

  cart[userId] = cart[userId] || [];

  cart[userId].push({
    name: '🍟 အာလူးကြော် အချို',
    price: 1000
  });

  ctx.reply(
`✅ အိတ်ထဲ ထည့်ပြီးပါပြီ။

🛒 စျေးဝယ်အိတ်ကို ဝင်ကြည့်နိုင်ပါတယ်။

အခြားအရသာရှိသော မုန့်များလည်း ရွေးချယ်နိုင်ပါတယ်။`
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

bot.hears('🛒 စျေးဝယ်အိတ်', (ctx) => {

  const userId = ctx.from.id;

  if (!cart[userId] || cart[userId].length === 0) {
    return ctx.reply('🛒 စျေးဝယ်အိတ်ထဲမှာ ပစ္စည်းမရှိသေးပါ။');
  }

  let text = '🛒 သင့်စျေးဝယ်အိတ်\n\n';
  let total = 0;

  cart[userId].forEach(item => {

    const sum = item.price * item.qty;
    total += sum;

    text += `${item.name} x ${item.qty}\n`;
    text += `💰 ${sum.toLocaleString()} MMK\n\n`;

  });

  text += `စုစုပေါင်း 💰 ${total.toLocaleString()} MMK`;

  ctx.reply(text);

});

// Back
bot.hears(/ပင်မ Menu/, (ctx) => {
  ctx.reply(
    '🏠 Main Menu',
    mainMenu()
  );
});

bot.on('text', (ctx) => {

  const userId = ctx.from.id;

  if (waitingForQty[userId]) {

    const qty = Number(ctx.message.text);

    if (isNaN(qty) || qty <= 0) {
      return ctx.reply('❌ Qty ကို ဂဏန်းနဲ့ ရေးပေးပါနော်။');
    }

    cart[userId] = cart[userId] || [];

    cart[userId].push({
      name: '🍟 အာလူးကြော် အချို',
      price: 1000,
      qty: qty
    });

    waitingForQty[userId] = false;

    ctx.reply(
`✅ Cart ထဲထည့်ပြီးပါပြီ

🍟 အာလူးကြော် အချို x ${qty}

🛒 စျေးဝယ်အိတ်မှာ ကြည့်နိုင်ပါတယ်။`
    );

  }

});

// Launch
bot.launch();

console.log('Bote EE Snack Bot Running 🚀');
