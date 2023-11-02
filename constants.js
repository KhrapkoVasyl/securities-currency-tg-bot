export const BotCommandEnum = {
  STATUS: '/status',
  CURRENCY: '/currency',
};

export const placeholders = {
  statuses: '[STATUSES]',
  status: '[STATUS]',
  region: '[REGION]',
};

export const BotMessages = {
  WRONG_COMMAND: 'Wrong command, try another one',
  SOMETHING_WENT_WRONG: 'Something went wrong, try again later',
  NO_STOCK_MARKET_INFO:
    'No current information about stock market statuses, try again later',
  NO_STOCK_MARKET_BY_REGION_INFO: `No information about stock market with specified region (${placeholders.region})`,
  STOCK_MARKET_STATUSES: `Stock market statuses:\n${placeholders.statuses}`,
  STOCK_MARKET_STATUS: `Stock market status: ${placeholders.status}`,
};

export const BOT_COMMANDS = [
  {
    command: BotCommandEnum.STATUS,
    description:
      'Get current spot markets statuses (open/closed). If specify specific market country, only information about the stock market of this country will be displayed ',
  },
  {
    command: BotCommandEnum.CURRENCY,
    description: 'Get currency of specified security by its ticker or name',
  },
];

export const SECURITIES_API_COMMANDS = {
  GET_STATUS: 'MARKET_STATUS',
  GET_BY_TICKER_OR_NAME: 'SYMBOL_SEARCH',
};

export const MarketStatuses = {
  closed: 'closed❌',
  open: 'open✔ ',
};
