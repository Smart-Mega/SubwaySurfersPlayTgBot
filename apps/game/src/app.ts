import express from 'express';
import { WebSocketServer } from 'ws';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import TelegramBot = require("node-telegram-bot-api");
import dotenv from "dotenv"
import { downloadAvatar } from './bot/avatar.util';
import { readData, writeData } from './bot/firebase.util';
import cors from "cors";
import bodyParser from 'body-parser';

dotenv.config()

const BOT_TOKEN = process.env.API_TELEGRAM_BOT_TOKEN;
console.log(BOT_TOKEN);

const MyTelegramBot = new TelegramBot(BOT_TOKEN);
// const MyTelegramBot = new TelegramBot(BOT_TOKEN, { webHook: { host: "localhost" } });


MyTelegramBot.setChatMenuButton({
  menu_button: {
    type: 'web_app',
    text: 'App',
    web_app: { url: process.env.WEBAPP_GAME_URL }
  }
});

let group_infos: any;
let referral_infos: any;
let user_infos: any;


const firebaseConfig = {
    apiKey: 'AIzaSyDwia8Nxmg54pQCbRm0BFNn_Zo_G1DVwjs',
    authDomain: 'subwaysurfersplay-63bc5.firebaseapp.com',
    projectId: 'subwaysurfersplay-63bc5',
    storageBucket: 'subwaysurfersplay-63bc5.appspot.com',
    messagingSenderId: '693245291563',
    appId: '1:693245291563:web:5bfba9a7fd1aef5e2a8e6e',

    /**
   *  Optional on firebase JS SDK v7.20.0 and later
   */
    measurementId: 'G-T0RMXTCJPG',
    databaseURL: 'https://subwaysurfersplay-63bc5-default-rtdb.firebaseio.com/'
};

const fapp = initializeApp(firebaseConfig);
const database = getDatabase(fapp);

const usersRef = ref(database, 'users');
const referralsRef = ref(database, 'referrals');
const groupsRef = ref(database, 'groups');

onValue(usersRef, (snapshot) => {
  if (snapshot.exists()) {
    user_infos = snapshot.val();
  }
});

onValue(referralsRef, (snapshot) => {
  if (snapshot.exists()) {
    referral_infos = snapshot.val();
  }
});

onValue(groupsRef, (snapshot) => {
  if (snapshot.exists()) {
    group_infos = snapshot.val();
  }
});

const app = express();
const port = 5000;

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app
  .use(express.static("surfersdebug"))
  .use(jsonParser)
  .use(urlencodedParser)
  .set("view engine", "ejs")
  .set("trust proxy", true)
  .use((req, res, next) => {
      // res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      console.log(req.method, req.url, req.body, req.params, req.query, req.ip);
      next()
    })
  .post('/', (req, res) => {
    res.json({});
  })
  .post('/firebase/config', (req, res) => {
    const sendConfig = {};
    for (let prop in firebaseConfig) {
      sendConfig[prop] = btoa(firebaseConfig[prop]);
    }
    res.json(sendConfig);
  })
  .post('/download/avatar', async (req, res) => {
    let avatar = '';
    if (req.body.id && req.body.name) {
        avatar = await downloadAvatar(MyTelegramBot, req.body.id as any, req.body.name as string);
    }
    res.json({avatar});
  })
  .post('/squad/join', async (req, res) => {
    const chat_id = req.body.chat_id;
    MyTelegramBot.getChat(chat_id).then(async (chat) => {
      console.log(chat);

      const me = await MyTelegramBot.getMe();
      MyTelegramBot.getChatMember(chat_id, me.id).then(val=>{}).catch(err=>{});
      res.json({success:true,joined:true});
    }).catch((err) => {
      console.log(err.toString());
      res.json({ success: false });
    });
  })
  .post('/squad/leave', async (req, res) => {
    const chat_id = req.body.chat_id;
    MyTelegramBot.leaveChat(chat_id).then(async (chat) => {
      console.log(chat);
      res.json({success:true,leaved:true});
    }).catch((err) => {
      console.log(err.toString());
      res.json({ success: false });
    });
  })
  .post('bot/info', (req, res) => {
    res.json({});
  })
  .use(/\/sockjs.*eventsource/, (req, res) => {
    res.writeHead(200, {
      'Content-Type': "text/event-stream",
      'Cache-Control': "no-cache",
      'Connection': "keep-alive"
    });
  })
  .use(/\/sockjs.*/, (req, res) => {
    res.json({});
  })
  .use(/\/\/.*/, (req, res) => {
    res.json({});
  })
  .get('/tasks', (req, res) => {
    const tasks = [];
    const numberof = 10;
    for (let i = 1000; i < 1000+numberof; i++) {
      tasks.push({
        id: i,
        title: `task-${i}`,
        award: 10,
        link: 'https://test.task.com',
        type: 'link',
      });
    }
    res.json(tasks);
  })
  .use(/\/bot.*/, (req, res) => {
    res.json({});
  })

const server = app.listen(port, () => {
  return console.log(`http://localhost:${port}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {  
    console.log('Client connected');  

    ws.on('message', (message) => {  
        console.log(`WS Received: ${message}`);  
        ws.send('');
    });

    ws.on('close', () => {  
        console.log('Client disconnected');  
    });  
});


MyTelegramBot.on("ready", () => {console.log('ready');}); // listening to the custom event
MyTelegramBot.on("message", (message: TelegramBot.Message, { type }) => {
  console.log('message', message, type);
  if (type == 'text') {
    if (message.entities && (message.entities?.[0]?.type ?? '') == 'bot_command') {
      const commands = message.text.split(/ +/);
      if (commands[0] == '/start') {
        if (commands[1] != undefined) {
          if (referral_infos == undefined || referral_infos == null) {
            referral_infos = [];
          }
          if (referral_infos[commands[1]] == undefined) {
            referral_infos[commands[1]] = [];
          }
          referral_infos[commands[1]].push(message.from?.username);
          writeData(database, 'referrals', referral_infos);
        }
      } else if (commands[0] == '/infos') {
        if (commands[1] != undefined) {
          if (commands[1] == 'users') {
            console.log(user_infos);
          } else if (commands[1] == 'referrals') {
            console.log(referral_infos);
          } else if (commands[1] == 'groups') {
            console.log(group_infos);
          }
        }
      }
    } else {}
  }
});
MyTelegramBot.on("callback_query", (query: TelegramBot.CallbackQuery) => { console.log('callback_query', query); });
MyTelegramBot.on("inline_query", (query: TelegramBot.InlineQuery) => { console.log('inline_query', query); });
MyTelegramBot.on("poll", (poll: TelegramBot.Poll) => { console.log('poll', poll); });
MyTelegramBot.on("poll_answer", (answer: TelegramBot.PollAnswer) => { console.log('poll_answer', answer); });
MyTelegramBot.on("chat_member", (member: TelegramBot.ChatMemberUpdated) => { console.log('chat_member', member); });
MyTelegramBot.on("my_chat_member", (member: TelegramBot.ChatMemberUpdated) => { console.log('my_chat_member', member); });
MyTelegramBot.on("chosen_inline_result", (result: TelegramBot.ChosenInlineResult) => { console.log('chosen_inline_result', result); });
MyTelegramBot.on("channel_post", (message: TelegramBot.Message) => { console.log('channel_post', message); });
MyTelegramBot.on("shipping_query", (query: TelegramBot.ShippingQuery) => { console.log('shipping_query', query); });
MyTelegramBot.on("pre_checkout_query", (query: TelegramBot.PreCheckoutQuery) => { console.log('pre_checkout_query', query); });
MyTelegramBot.on("polling_error", (error: Error) => { console.log('polling_error', error); });
MyTelegramBot.on("chat_join_request", (query: TelegramBot.ChatJoinRequest) => { console.log('chat_join_request', query); });



(async () => {
  // group_infos = await readData(database, 'groups');
  // referral_infos = await readData(database, 'referrals');
  // user_infos = await readData(database, 'users');

  console.log((await MyTelegramBot.getMe()).id)
  MyTelegramBot.startPolling();
})();
