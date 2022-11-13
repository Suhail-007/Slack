import dashboardView from './views/dashboard/dashboardView.js';
import fundTransferView from './views/dashboard/renderReferralTransferView.js';
import profileView from './views/profileView.js';
import { Delay } from './delay/delay.js'
import { loader } from './loader/loaderView.js';

export const chartTypes = {
  typeOne: 'doughnut',
  typeTwo: 'line',
}

export const theme = {
  mode: 'system default',
}

export const copyRefLink = async function(element) {
  await navigator.clipboard.writeText(element.innerText);
}

export const renderTab = async function(e) {
  const elem = e.target.closest('.nav_item');

  if (!elem) return

  const dataset = elem.dataset.nav.toLowerCase();
  const main = document.querySelector('main');

  await loader();
  await  Delay(1000);

  main.innerHTML = '';

  switch (dataset) {
    case 'dashboard':
      dashboardView.renderDashboardMarkup();
      fundTransferView.addHandlerCopyRef(copyRefLink);
      fundTransferView.activeBtn();
      break;

    case 'profile':
      profileView.renderProfileView();
      profileView.addHandlerSettings(settings)
      break;
    default:
      return
  }
}

export const settings = function(e) {
  const elem = e.target.closest('[data-settings]');
  let selectElem;

  if (elem && e.target.closest(`[data-select=theme]`)) {
    selectElem = e.target.closest(`[data-select=theme]`);
    applyTheme(selectElem);
  }

  if (elem && e.target.closest(`[data-select=chartOne]`)) {
    selectElem = e.target.closest(`[data-select=chartOne]`);

    selectElem.addEventListener('change', (e) => {
      console.log(e.target.value);
    }, { once: true });

  }

  if (elem && e.target.closest(`[data-select=chartTwo]`)) {
    selectElem = e.target.closest(`[data-select=chartTwo]`);

    selectElem.addEventListener('change', (e) => {
      console.log(e.target.value);
    }, { once: true });
  }
}


const applyTheme = function(elem) {
  elem.addEventListener('change', (e) => {
    const selectedValue = e.target.value.toLowerCase();
    const body = document.body;

    switch (selectedValue) {
      case 'system default':
        systemDefaultTheme();
        break;
      case 'light':
        body.classList.remove('dark');
        break;
      case 'dark':
        body.classList.add('dark');
        break;
      default:
        return
    }

    theme.mode = selectedValue;
    setLocalStorage('selectedTheme', theme.mode);
  }, { once: true })
}

const systemDefaultTheme = function() {
  const hours = new Date().getHours();
  const isDayTime = hours >= 18 || hours <= 6;

  if (isDayTime) document.body.classList.add('dark');
  else document.body.classList.remove('dark');
}

//initialize the theme on pahe load
export const initTheme = function() {
  //apply the theme
  theme.mode === 'system default' ? systemDefaultTheme() : theme.mode === 'light' ? '' : theme.mode === 'dark' ? document.body.classList.add('dark') : '';
}

//set Local Storage
export const setLocalStorage = function(key, value) {
  localStorage.setItem(`${key}`, JSON.stringify(`${value}`));
}

//get saved value from Local Storage
export const getLocalStorage = function() {
  const selectedTheme = JSON.parse(localStorage.getItem('selectedTheme'));

  theme.mode = selectedTheme ? selectedTheme : theme.mode;
}
