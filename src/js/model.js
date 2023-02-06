import loginView from './views/loginView.js';
import signUpView from './views/signupView.js';
import resetPassView from './views/resetPassView.js';
import homeView from './views/homeView.js';
import dashboardView from './views/dashboard/dashboardView.js';
import chartView from './views/dashboard/chartView.js';
import fundAndReferralView from './views/dashboard/fundAndReferralView.js';
import profileView from './views/pages/profileView.js';
import investWalletView from './views/pages/investWallet.js';
import teamSummary from './views/pages/team-summary.js';
import incomeView from './views/pages/income.js';
import pageNotFoundView from './views/pages/404.js';
import editProfileView from './views/pages/editProfile.js';

import { cryptoConfig, stockMarketConfig, API_KEY } from './config.js';
import logoutUserView from './views/pages/logout.js';
import { updateURL, NAV_TOGGLE_BTN, setLocalStorage, fetchURL, modalHandler, toggleModal } from './helper.js';

import { loginUser, createUserSendEmailVerif, createUserData, getUserDataAndUserPic, resetUserPass, sendEmailVerif, logoutUser, authChanged, deleteUserAndData, unSubAuth, unSubSnapShot, updateUserData, uploadPic, updateUserPassword } from './firebase-app.js';


export const copyRefLink = async function(element) {
  await navigator.clipboard.writeText(element.innerText);
}

let isLogin = false;

const user = {
  //it will be created only when user log in
  // data: {},
};

const router = {
  'null': {
    view: async function() {
      try {
        await loginView.loader();
        await loginView.Delay(500);
        loginView.renderData(user);
        loginAgainMessage();

        loginView.init(renderTab, loginUser, sendEmailVerif, logoutUser, getUserDataAndUserPic, initHome);
        modalHandler();
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
        signUpView.init(createUserSendEmailVerif, createUserData);
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
        await dashboardView.loader();
        await dashboardView.Delay(1000);
        dashboardView.renderData(user);
        chartView.createChart(user);

        dashboardView.init(updateUserData, copyRefLink);
        initTheme(user)
      } catch (err) {
        console.log(err);
        toggleModal(err);
      }
    }
  },

  'profile': {
    view: async function() {
      try {
        await profileView.loader();
        await profileView.Delay(1000);
        profileView.renderData(user);
        profileView.init(settings, deleteUserAndData, loginUser, renderTab);
      } catch (err) {
        console.log(err);
        profileView.renderMessage('Failed to load profile, try reloading ' + err, 'error', 3000);
      }
    }
  },

  'profileEdit': {
    view: async function() {
      try {
        await editProfileView.loader();
        await editProfileView.Delay(1000);
        editProfileView.renderData(user);
        editProfileView.init(updateUserData, renderTab, updateUserPassword, uploadPic, initHome, homeView, loginUser);
      } catch (err) {
        console.log(err);
      }
    }
  },

  'invest wallet': {
    view: async function() {
      try {
        await investWalletView.loader();
        await investWalletView.Delay(1000);
        investWalletView.renderData(user);
        await investWalletView.init(getBitcoinDetails, updateUserData, getStockOpenPrice);

      } catch (err) {
        console.log(err);
      }
    }
  },

  'team summary': {
    view: async function() {
      try {
        await teamSummary.loader();
        await teamSummary.Delay(1000);
        teamSummary.renderData(user);
        teamSummary.init();
      } catch (err) {
        console.log(err);
        teamSummary.renderMessage(err, 'error', 4000);
      }
    }
  },

  'income': {
    view: async function() {
      try {
        await incomeView.loader();
        await incomeView.Delay(1000);
        incomeView.renderData(user);
        incomeView.init();
      } catch (err) {
        console.log(err);
        incomeView.renderMessage(err, 'error', 4000);
      }
    }
  },

  'logout': {
    view: async function() {
      try {
        await logoutUserView.init(logoutUser, unSubAuth, unSubSnapShot);
      } catch (err) {
        console.log(err);
      }
    }
  },

  '404': {
    view: function() {
      pageNotFoundView.init();
    }
  }
}

export const renderTab = async function() {
  const { page } = getPage();
  const res = await authChanged(user);

  //scroll to top of every section
  scrollToTop();

  //signout the user if user go back to login page
  if (page === null && res) logoutUser();

  //if user is signout and go back to dashboard redirect user to login page
  if (!res && page != null && page !== 'signup' && page !== 'reset password') return updateURL('_', true);

  //if page not found
  if (router[page] === undefined) await router['404'].view();

  if (router[page]) await router[page].view();
}

export const renderFromHistory = function() {
  window.addEventListener('popstate', renderTab);
}

export const windowLoad = function() {
  window.addEventListener('load', async () => {
    const { page } = getPage();
    const res = await authChanged(user);

    if (page != null && res) {
      renderTab();
      scrollToTop();
      initHome();
      modalHandler();
      initTheme(user)
      return
    }
    return renderTab();
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

const loginAgainMessage = function() {
  const isLogin = sessionStorage.getItem('isLogin');
  if (isLogin) {
    loginView.renderMessage('Login again to access your account', 'error', 4000);
  }
}

const getPage = function() {
  const url = new URL(location.href);
  const page = url.searchParams.get('page');
  return { page }
}

const getBitcoinDetails = async function() {
  try {
    const url = `${cryptoConfig.url}&apiKey=${API_KEY}`;
    const data = await fetchURL(url);
    return data
  } catch (err) {
    throw err
  }
}
const getStockOpenPrice = async function() {
  try {
    // const url = `${stockMarketConfig.url}&apiKey=${API_KEY}`;
    // const data = await fetchURL(url);
    // return { data }
  } catch (err) {
    throw err
  }
}

export const settings = async function(e) {
  try {
    const elem = e.target.closest('[data-settings]');
    const option = e.target.closest(`[data-select]`);
    let selected;

    switch (option.dataset.select) {
      case 'theme':
        selected = e.target.closest(`[data-select=theme]`);
        applyTheme(selectElem);
        break;

      case 'chart':
        const id = e.target.id;
        selected = document.querySelector(`#${id}`);

        selected.addEventListener('change', async (e) => {
          try {
            id === 'roi' ? await updateUserData({ 'preference.charts.roi': e.target.value }) : await updateUserData({ 'preference.charts.bi': e.target.value });
          } catch (err) { throw err }
        }, { once: true });
        break;
    }
  } catch (err) { throw err }

  // if (elem && e.target.closest(`[data-select=bi]`)) {
  //   selectElem = e.target.closest(`[data-select=bi]`);

  //   selectElem.addEventListener('change', async (e) => {
  //     await updateUserData({ 'preference.roi': e.target.value });
  //   }, { once: true });
  // }
}

const applyTheme = function(elem) {
  //assign event listener to select tag
  elem.addEventListener('change', async (e) => {
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

    await updateUserData({ 'preference.theme': selectedValue })
  }, { once: true })
}

const systemDefaultTheme = function() {
  const hours = new Date().getHours();
  const isDayTime = hours >= 18 || hours <= 6;

  if (isDayTime) document.body.classList.add('dark');
  else document.body.classList.remove('dark');
}

//initialize the theme on pahe load
export const initTheme = function(user) {
  const { theme } = user.data.preference;

  //apply the theme
  theme === 'system default' ? systemDefaultTheme() : theme === 'light' ? '' : theme === 'dark' ? document.body.classList.add('dark') : '';
}