import TelegramBot from 'node-telegram-bot-api';
import { config } from 'dotenv';
import { BOT_COMMANDS, BotMessages, WRONG_COMMAND_MSG } from './constants.js';
config();

const token = process.env.BOT_TOKEN;
const apiKey = process.env.STOCK_MARKET_API_KEY;

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands(BOT_COMMANDS);

bot.on('message', async (message) => {
  try {
    const chatId = message.chat.id;
    const text = message.text;

    return bot.sendMessage(chatId, BotMessages.WRONG_COMMAND);
  } catch {
    return bot.sendMessage(chat, BotMessages.SOMETHING_WENT_WRONG);
  }
});
