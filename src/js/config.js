import { getCurrentDate } from './helper.js';

const { day, month, year } = getCurrentDate();
export const defaultUserPic = 'https://i.ibb.co/7rJ6Ddn/avatar.png';
export const TIMEOUT_SEC = 2000;

export const chartTypes = {
  roi: 'doughnut',
  binaryIncome: 'line',
}

export const cryptoConfig = {
  API_KEY: '_Is0RWEk2R42Yc_YPTMSeGb8QnPJDN9r',
  url: `https://api.polygon.io/v1/open-close/crypto/BTC/USD/${year}-${month}-${day}?adjusted=true`
}