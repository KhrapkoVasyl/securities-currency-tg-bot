import { config } from 'dotenv';
import axios from 'axios';
import {
  BotMessages,
  LAST_PRICE_KEY,
  MarketStatuses,
  PRICES_KEY,
  SECURITIES_API_COMMANDS,
  SECURITY_CURRENCY_INTERVAL,
  placeholders,
} from './constants.js';
config();

const apiUrl = process.env.STOCK_MARKET_API_URL;
const apiKey = process.env.STOCK_MARKET_API_KEY;

const getMarketStatusesList = (markets) => {
  let marketStatusesList = '';
  for (const market of markets) {
    const { region, current_status, market_type } = market;
    marketStatusesList += `${region}(${market_type}) - ${MarketStatuses[current_status]}\n`;
  }

  const stauses = marketStatusesList.trim();
  return BotMessages.STOCK_MARKET_STATUSES.replace(
    placeholders.statuses,
    stauses
  );
};

const getMarketStatusByRegion = (markets, searchRegion) => {
  const marketInfoByRegion = markets.find(
    (market) => market.region === searchRegion
  );

  if (!marketInfoByRegion) {
    return BotMessages.NO_STOCK_MARKET_BY_REGION_INFO.replace(
      placeholders.region,
      searchRegion
    );
  }

  const { region, current_status, market_type } = marketInfoByRegion;

  return BotMessages.STOCK_MARKET_STATUS.replace(
    placeholders.status,
    `${region}(${market_type}) - ${MarketStatuses[current_status]}`
  );
};

export const getMarketStatus = async (region) => {
  const res = await axios.get(
    `${apiUrl}?apikey=${apiKey}&function=${SECURITIES_API_COMMANDS.GET_STATUS}`
  );

  const markets = res?.data?.markets;
  if (!markets) {
    return BotMessages.NO_STOCK_MARKET_INFO;
  }

  return region
    ? getMarketStatusByRegion(markets, region)
    : getMarketStatusesList(markets);
};

export const getSecurityCurrency = async (ticker) => {
  if (!ticker?.trim()) {
    return BotMessages.SECURITY_TICKER_NOT_SPECIFIED;
  }

  const res = await axios.get(
    `${apiUrl}?apikey=${apiKey}&function=${SECURITIES_API_COMMANDS.GET_BY_TICKER_OR_NAME}&symbol=${ticker}&interval=${SECURITY_CURRENCY_INTERVAL}`
  );

  const currencyData = res?.data;
  const timeSeries = currencyData?.[`${PRICES_KEY}`] ?? {};
  const latestTime = Object.keys(timeSeries)[0];
  const latestPrice = timeSeries?.[latestTime]?.[`${LAST_PRICE_KEY}`];

  return latestPrice && latestTime
    ? BotMessages.SECURITY_CURRENCY.replace(
        placeholders.security,
        ticker
      ).replace(placeholders.currency, latestPrice)
    : BotMessages.NO_SECURITY_CURRENCY_INFO.replace(
        placeholders.security,
        ticker
      );
};
