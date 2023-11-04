export const BotCommandEnum = {
  STATUS: '/status',
  CURRENCY: '/currency',
};

export const placeholders = {
  statuses: '[STATUSES]',
  status: '[STATUS]',
  region: '[REGION]',
  security: '[SECURITY]',
  currency: '[CURRENCY]',
};

export const BotMessages = {
  WRONG_COMMAND: 'Wrong command, try another one',
  SOMETHING_WENT_WRONG: 'Something went wrong, try again later',
  NO_STOCK_MARKET_INFO:
    'No current information about stock market statuses, try again later',
  NO_STOCK_MARKET_BY_REGION_INFO: `No information about stock market with specified region (${placeholders.region})`,
  STOCK_MARKET_STATUSES: `Stock market statuses:\n${placeholders.statuses}`,
  STOCK_MARKET_STATUS: `Stock market status: ${placeholders.status}`,
  SECURITY_CURRENCY: `Last currency of specified security (${placeholders.security}): $${placeholders.currency}`,
  NO_SECURITY_CURRENCY_INFO: `Currency of specified security (${placeholders.security}) was not found`,
  SECURITY_TICKER_NOT_SPECIFIED: `Security ticker not specified. Please, try again with ticker, e.g. '/currency voo'`,
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
  GET_BY_TICKER_OR_NAME: 'TIME_SERIES_INTRADAY',
};

export const SECURITY_CURRENCY_INTERVAL = '1min';
export const PRICES_KEY = `Time Series (${SECURITY_CURRENCY_INTERVAL})`;
export const LAST_PRICE_KEY = '1. open';

export const MarketStatuses = {
  closed: 'closed❌',
  open: 'open✅ ',
};
