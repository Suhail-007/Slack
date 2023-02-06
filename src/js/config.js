import { getCurrentDate } from './helper.js';

const { day, month, year } = getCurrentDate();
export const defaultUserPic = 'https://i.ibb.co/7rJ6Ddn/avatar.png';
export const TIMEOUT_SEC = 2000;

export const API_KEY = '_Is0RWEk2R42Yc_YPTMSeGb8QnPJDN9r';

export const cryptoConfig = {
  url: `https://api.polygon.io/v1/open-close/crypto/BTC/USD/${year}-${month}-${day}?adjusted=true`
}

export const stockMarketConfig = {
  // url: `https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/${year}-${month}-${day}`
}