import dashboardView from './views/dashboard/dashboardView.js';
import loginView from './views/loginView.js';
import fundTransferView from './views/dashboard/renderReferralTransferView.js';
import profileView from './views/profileView.js';
import { chartTypes } from './config.js';

export const theme = {
  mode: 'system default',
}

export const copyRefLink = async function(element) {
  await navigator.clipboard.writeText(element.innerText);
}

export const router = {
  '/index.html': {
    view: async function() {
      await loginView.loader();
      await loginView.Delay(500);
      loginView._generateMarkup();
      loginView.isFocus();
    },
  }

}

export const renderTab = async function() {
  // console.log(location.pathname);
  const pathname = location.pathname;

  // if (router[pathname]) {
  //   router[pathname].view();
  // }

  switch (pathname) {
    case '/':
    case '/index.html':
      loginView._generateMarkup();
      loginView.isFocus();
      break;

    case 'dashboard':
      await dashboardView.loader();
      await dashboardView.Delay(1000);
      dashboardView.generateDashboardSections();
      fundTransferView.addHandlerCopyRef(copyRefLink);
      fundTransferView.activeBtn();
      break;

    case 'profile':
      await profileView.loader();
      await profileView.Delay(1000);
      profileView.renderProfileView();
      profileView.addHandlerSettings(settings);
      break;
    default:
      return
  }
}

export const settings = function(e) {
  const elem = e.target.closest('[data-settings]');
  let selectElem;

  if (elem && e.target.closest(`[data-select=theme]`)) {
    //get select tag 
    selectElem = e.target.closest(`[data-select=theme]`);
    applyTheme(selectElem);
  }

  if (elem && e.target.closest(`[data-select=chartOne]`)) {
    selectElem = e.target.closest(`[data-select=chartOne]`);

    selectElem.addEventListener('change', (e) => {
      const selectedValue = e.target.value;
      chartTypes.chartOne = selectedValue;

      setLocalStorage('chartTypeOne', chartTypes.chartOne);
    }, { once: true });
  }

  if (elem && e.target.closest(`[data-select=chartTwo]`)) {
    selectElem = e.target.closest(`[data-select=chartTwo]`);

    selectElem.addEventListener('change', (e) => {
      const selectedValue = e.target.value;
      chartTypes.chartTwo = selectedValue;

      setLocalStorage('chartTypeTwo', chartTypes.chartTwo);
    }, { once: true });
  }
}


const applyTheme = function(elem) {
  //assign event listener to select tag
  elem.addEventListener('change', (e) => {
    //get value
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
export const initThemeLocalStorage = function() {
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
  const chartOne = JSON.parse(localStorage.getItem('chartTypeOne'));
  const chartTwo = JSON.parse(localStorage.getItem('chartTypeTwo'));

  theme.mode = selectedTheme ? selectedTheme : theme.mode;

  chartTypes.chartOne = chartOne ? chartOne : 'doughnut';
  chartTypes.chartTwo = chartTwo ? chartTwo : 'line';
}