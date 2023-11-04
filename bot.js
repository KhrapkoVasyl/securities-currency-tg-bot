import TelegramBot from 'node-telegram-bot-api';
import { config } from 'dotenv';
import { BOT_COMMANDS } from './constants.js';
import { handleBotMessageByCommand, handleException } from './bot.handlers.js';
config();

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands(BOT_COMMANDS);

bot.on('message', async (message) =>
  handleBotMessageByCommand(bot, message).catch((error) =>
    console.error('Unexpected error while processing message: ', error)
  )
);
