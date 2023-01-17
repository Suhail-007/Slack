import loginView from './views/loginView.js';
import signUpView from './views/signupView.js';
import resetPassView from './views/resetPassView.js';
import homeView from './views/homeView.js';
import dashboardView from './views/dashboard/dashboardView.js';
import fundTransferView from './views/dashboard/renderReferralTransferView.js';
import profileView from './views/pages/profileView.js';
import { chartTypes } from './config.js';
import { updateURL, NAV_TOGGLE_BTN, setLocalStorage } from './helper.js';
import { loginUser, createUserSendEmailVerif, createUserData, getUserDataAndUserPic, resetUserPass, sendEmailVerif, signoutUser, authChanged, deleteUserAndData, unSubAuth } from './firebase-app.js';
import chartView from './views/dashboard/chartView.js';

export const theme = {
  mode: 'system default',
}

export const copyRefLink = async function(element) {
  await navigator.clipboard.writeText(element.innerText);
}

let wasLogin = false;

const user = {
  //it will be created only when user log in
  // data: {},
  themeMode: 'system default'
};

const router = {
  'null': {
    view: async function() {
      try {
        await loginView.loader();
        await loginView.Delay(500);
        loginView.renderData(user);
        if (wasLogin === true) loginView.renderMessage('Login again to access your account', 'error', 4000);
        loginView.init(renderTab, loginUser, sendEmailVerif, signoutUser, getUserDataAndUserPic, initHome);
        homeView.removeHeaderFooter();
      } catch (err) {
        loginView.renderMessage(err, 'error', 4000)
      }
    }
  },

  'signup': {
    view: async function() {
      try {
        signUpView.renderData(user);
        signUpView.getSignInDetails(createUserSendEmailVerif, createUserData);
        signUpView.previewUserProfile();
      } catch (err) {
        signUpView.renderMessage(err, 'success')
      }
    }
  },

  'reset password': {
    view: async function() {
      await resetPassView.loader();
      await resetPassView.Delay(1000);
      resetPassView.renderData('_');
      resetPassView.init(resetUserPass);
    }
  },

  'dashboard': {
    view: async function() {
      try {
        scrollToTop();

        await dashboardView.loader();
        await dashboardView.Delay(1000);
        dashboardView.renderData(user);
        chartView.createChart();

        fundTransferView.addHandlerCopyRef(copyRefLink);
        fundTransferView.activeBtn();
      } catch (err) {
        // dashboardView.renderMessage('Failed to load dashboard, try reloading ' + err, 'default', 10000);
      }
    }
  },

  'profile': {
    view: async function() {
      try {
        /*********Temporary*********/
        scrollToTop();
        /******************/

        await profileView.loader();
        await profileView.Delay(1000);
        profileView.renderData(user);
        profileView.init(settings, deleteUserAndData, loginUser);
      } catch (err) {
        console.log(err);
        profileView.renderMessage('Failed to load profile, try reloading ' + err, 'error', 3000);
      }
    }
  }
}

export const renderTab = async function() {
  const url = new URL(location.href);
  const page = url.searchParams.get('page');
  const res = await authChanged(user);

  //redirect user to login page if page reload and user not login in
  if (page === null && res) signoutUser();

  //get the user if user is not sign out and page refreshes/reload
  if (!res && page != null && page !== 'signup' && page !== 'reset password') return updateURL('_', true);
  if (router[page]) await router[page].view();
}

export const renderFromHistory = function() {
  window.addEventListener('popstate', renderTab);
}

export const windowLoad = function() {
  window.addEventListener('load', async () => {
    const url = new URL(location.href);
    const page = url.searchParams.get('page');
    const res = await authChanged(user);

    if (page === null || page === 'reset password') return renderTab();

    renderTab();
    scrollToTop();
    initHome();
  });
}

const initHome = function() {
  homeView.generateHomeMarkup(user);
  NAV_TOGGLE_BTN();
  homeView.navTab(renderTab, updateURL);
}

const scrollToTop = function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
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

//get saved value from Local Storage
export const getLocalStorage = function() {
  const selectedTheme = JSON.parse(localStorage.getItem('selectedTheme'));
  const chartOne = JSON.parse(localStorage.getItem('chartTypeOne'));
  const chartTwo = JSON.parse(localStorage.getItem('chartTypeTwo'));

  theme.mode = selectedTheme ? selectedTheme : theme.mode;

  chartTypes.chartOne = chartOne ? chartOne : 'doughnut';
  chartTypes.chartTwo = chartTwo ? chartTwo : 'line';
  wasLogin = localStorage.getItem('wasLogin', wasLogin);
  console.log(wasLogin);
}