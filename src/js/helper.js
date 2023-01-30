import { TIMEOUT_SEC } from './config.js';

export const NAV_TOGGLE_BTN = function() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-navBtn-container]');

    const sideBar = document.querySelector('.navbar');

    if (!sideBar) return

    //if user is not clicking inside of sidebar, close it
    if (!btn && !e.target.closest('.navbar')) sideBar.classList.remove('open');

    if (btn) sideBar.classList.add('open');
  });
};

//set Local Storage
export const setLocalStorage = function(key, value) {
  localStorage.setItem(`${key}`, JSON.stringify(`${value}`));
}

export const updateURL = function(page, reset = false) {
  if (reset) {
    location.href = new URL(location.origin + location.pathname, location.href);
    return
  };
  history.pushState('', '', `?page=${page}`);
}

const Timeout = function(ms) {
  return new Promise(reject => {
    setTimeout(() => {
      reject('Request Timeout, Reload page');
    }, ms)
  }).catch(err => {
    throw Error(err);
  })
}

export const fetchURL = async function(url) {
  try {
    const res = await Promise.race([fetch(url), Timeout(TIMEOUT_SEC)]);
    
    if (!res) throw Error('Data not found, reload page');
    
    const data = await res.json();

    return data;
  } catch (err) {
    throw err
  }
}

export function getCurrentDate() {
  const date = new Date()
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  const monthDays = new Date(year, date.getMonth() + 1, 0).getDate();
  const day = date.getDate();

  month = month < 10 ? '0' + month : month;

  return {
    date: `${year}-${month}-${monthDays}`,
    day,
    month,
    year
  }
}