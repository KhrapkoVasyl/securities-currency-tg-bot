import { BotCommandEnum, BotMessages } from './constants.js';
import {
  getMarketStatus,
  getSecurityCurrency,
} from './securities-currency.service.js';

export const handleWrongCommand = (bot, chatId) =>
  bot.sendMessage(chatId, BotMessages.WRONG_COMMAND);

export const handleException = (bot, chatId) =>
  bot.sendMessage(chatId, BotMessages.SOMETHING_WENT_WRONG);

export const handleGetMarketStatus = async (bot, chatId, region) => {
  const responseMessage = await getMarketStatus(region);
  return bot.sendMessage(chatId, responseMessage);
};

export const handleGetSecurityCurrency = async (bot, chatId, ticker) => {
  const responseMessage = await getSecurityCurrency(ticker);
  return bot.sendMessage(chatId, responseMessage);
};

export const handleBotMessageByCommand = async (bot, message) => {
  try {
    const chatId = message.chat.id;
    const text = message.text;

    const handlerByCommand = {
      [BotCommandEnum.STATUS]: handleGetMarketStatus,
      [BotCommandEnum.CURRENCY]: handleGetSecurityCurrency,
    };

    for (const command of Object.keys(handlerByCommand)) {
      if (text?.startsWith(command)) {
        const param = text.replace(command, '').trim();
        const handler = handlerByCommand[command];
        return handler(bot, chatId, param);
      }
    }

    return handleWrongCommand(bot, chatId);
  } catch {
    return handleException(bot, chatId);
  }
};
