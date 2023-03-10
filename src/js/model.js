import loginView from './views/pages/loginView.js';
import signUpView from './views/pages/signupView.js';
import resetPassView from './views/pages/resetPassView.js';
import headerFooterView from './components/headerFooterView.js';
import homeView from './views/home/homeView.js';
import profileView from './views/pages/profileView.js';
import investWalletView from './views/pages/investWallet.js';
import teamSummary from './views/pages/team-summary.js';
import incomeView from './views/pages/income.js';
import editProfileView from './views/pages/editProfile.js';

import { cryptoConfig, stockMarketConfig, API_KEY } from './config.js';
import logoutUserView from './views/pages/logout.js';
import { updateURL, NAV_TOGGLE_BTN, fetchURL, modalHandler, toggleModal } from './helper.js';
import firebaseObj from './firebase-app.js';

let isLogin = false;

const user = {
  //it will be created only when user log in
  // data: {},
};

const router = {
  'null': {
    view: async function() {
      try {
        const helper = {
          renderTab,
          initHome,

          loginUser: firebaseObj.loginUser,
          sendEmailVerif: firebaseObj.sendEmailVerif,
          logoutUser: firebaseObj.logoutUser,
          getUserDataAndUserPic: firebaseObj.getUserDataAndUserPic,
        };
        await loginView.loader();
        await loginView.Delay(200);
        loginView.renderData(user);
        systemDefaultTheme();
        loginAgainMessage();

        loginView.init(helper);
        modalHandler();
        headerFooterView.removeHeaderFooter();
        hideScroll()
      } catch (err) {
        loginView.renderMessage(err, 'error', 4000)
      }
    }
  },

  'signup': {
    view: async function() {
      try {
        const { createUserSendEmailVerif, createUserData } = firebaseObj;

        await signUpView.loader();
        await resetPassView.Delay(200);
        signUpView.renderData(user);
        signUpView.init(createUserSendEmailVerif, createUserData);
        hideScroll()
      } catch (err) {
        signUpView.renderMessage(err, 'success')
      }
    }
  },

  'reset password': {
    view: async function() {
      try {
        const { resetUserPass } = firebaseObj;

        await resetPassView.loader();
        await resetPassView.Delay(200);
        resetPassView.renderData('_');
        resetPassView.init(resetUserPass);
        hideScroll();
      } catch (err) {
        await resetPassView.renderMessage(err, 'error', 2000);
      }
    }
  },

  'dashboard': {
    view: async function() {
      try {
        await homeView.loader();
        await homeView.Delay(200);
        homeView.renderData(user);
        homeView.init();
        initTheme(user);
        hideScroll();
      } catch (err) {
        toggleModal(err);
      }
    }
  },

  'profile': {
    view: async function() {
      try {
        const helper = {
          settings,
          renderTab,
          deleteUserAndData: firebaseObj.deleteUserAndData,
          loginUser: firebaseObj.loginUser
        };

        await profileView.loader();
        await profileView.Delay(200);
        profileView.renderData(user);
        profileView.init(helper);
      } catch (err) {
        profileView.renderMessage('Failed to load profile, try reloading ' + err, 'error', 3000);
      }
    }
  },

  'profileEdit': {
    view: async function() {
      try {
        const helper = {
          renderTab,
          updateUserData: firebaseObj.updateUserData,
          updateUserPassword: firebaseObj.updateUserPassword,
          uploadPic: firebaseObj.uploadPic,
          loginUser: firebaseObj.loginUser
        };

        await editProfileView.loader();
        await editProfileView.Delay(200);
        editProfileView.renderData(user);
        editProfileView.init(helper);
      } catch (err) {
        console.log(err);
      }
    }
  },

  'invest wallet': {
    view: async function() {
      try {
        await investWalletView.loader();
        await investWalletView.Delay(200);
        investWalletView.renderData(user);
        await investWalletView.init(getBitcoinDetails, getStockOpenPrice);

      } catch (err) {
        console.log(err);
      }
    }
  },

  'team summary': {
    view: async function() {
      try {
        await teamSummary.loader();
        await teamSummary.Delay(200);
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
        await incomeView.Delay(200);
        incomeView.renderData(user);
        incomeView.init();
      } catch (err) {
        incomeView.renderMessage(err, 'error', 4000);
      }
    }
  },

  'logout': {
    view: async function() {
      try {
        await logoutUserView.init(firebaseObj.logoutUser);
      } catch (err) {
        console.log(err);
      }
    }
  },
}

export const renderTab = async function() {
  try {
    const { page } = getPage();

    const { authChanged, logoutUser } = firebaseObj;
    const res = await authChanged(user);

    //scroll to top of every section
    scrollToTop();

    //signout the user if user go back to login page
    if (page === null && res) logoutUser();

    //if user is signout and user try to navigate to anywhere except these, redirect user to login page
    if (!res && page != null && page !== 'signup' && page !== 'reset password') return updateURL('_', true);

    //render page
    if (router[page]) await router[page].view();
  } catch (err) {
    toggleModal(err);
  }
}

export const renderFromHistory = function() {
  window.addEventListener('popstate', () => {
    const { page } = getPage();

    //add the class to navlink
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(li => li.classList.remove('active'));

    renderTab();
    if (page !== null && page !== 'signup' && page !== 'reset password') {
      selectActiveTab(history.state?.page);
    }
  });
}

export const windowLoad = function() {
  window.addEventListener('load', async () => {
    const { page } = getPage();

    if (page === null || page === 'signup' || page === 'reset password') return await renderTab();

    await renderTab();
    scrollToTop();
    modalHandler();
    await initHome(user);
    initTheme(user);
    hideScroll()
  });
}

const selectActiveTab = function(tab) {
  if (tab === 'profileEdit') document.querySelector(`[data-nav='profile']`).classList.add('active');
  else if (tab) document.querySelector(`[data-nav='${tab}']`).classList.add('active')
  else document.querySelector(`[data-nav='dashboard']`).classList.add('active');
}

const initHome = async function(user) {
  try {
    const { page } = getPage();
    await headerFooterView.generateHomeMarkup(user);
    NAV_TOGGLE_BTN();
    headerFooterView.navTab(renderTab, updateURL);

    selectActiveTab(page);
  } catch (err) {
    throw err
  }
}

const scrollToTop = function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

const hideScroll = function() {
  const { page } = getPage();

  if (page == null || page === 'reset password') document.body.style.overflow = 'hidden';
  else document.body.style.overflow = 'auto';
}

const loginAgainMessage = async function() {
  const isLogin = sessionStorage.getItem('isLogin');
  if (isLogin) {
    await loginView.renderMessage('Login again to access your account', 'error', 4000);
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
    if (!data) toggleModal('Try again after a minute to see prices');
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
        applyTheme(selected);
        break;

      case 'chart':
        const id = e.target.id;
        selected = document.querySelector(`#${id}`);

        selected.addEventListener('change', (e) => {
          updateChart(e.target.value, id);
        })
        break;
    }
  }
  catch (err) {
    throw err
  }
}

const updateChart = async function(value, id) {
  try {
    const { updateUserData } = firebaseObj;
    toggleModal('Please wait updating chart');
    id === 'roi' ? await updateUserData({ 'preference.charts.roi': value }) : await updateUserData({ 'preference.charts.bi': value });
    toggleModal('Chart updated');
  } catch (err) {
    throw err
  }
}

const applyTheme = function(elem) {
  //assign event listener to select tag
  elem.addEventListener('change', async (e) => {
    const { updateUserData } = firebaseObj;
    //get value
    const selectedValue = e.target.value.toLowerCase();
    const body = document.body;

    toggleModal('Please wait updating theme');

    //apply theme once database is updated
    await updateUserData({ 'preference.theme': selectedValue });

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
    toggleModal('Theme updated');

  }, { once: true })
}

export const systemDefaultTheme = function() {
  const hours = new Date().getHours();
  const isDayTime = hours >= 18 || hours <= 6;

  if (isDayTime) document.body.classList.add('dark');
  else document.body.classList.remove('dark');
}

//initialize the theme on page load
const initTheme = function(user) {
  const { theme } = user.data.preference;

  //apply the theme
  theme === 'system default' ? systemDefaultTheme() : theme === 'light' ? document.body.classList.remove('dark') : theme === 'dark' ? document.body.classList.add('dark') : '';
}


//set up firebase object everywhere