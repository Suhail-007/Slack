import * as model from './model.js';
import fundTransferView from './views/dashboard/renderReferralTransferView.js';
import dashboardView from './views/dashboard/dashboardView.js';
import profileView from './views/profileView.js'
import { NAV_TOGGLE_BTN } from './helper.js';
import { loader } from './loader/loaderView.js';
import { Delay } from './delay/delay.js';

const controlDashboard = async function() {
  await loader();
  await Delay(1000);
  dashboardView.renderDashboardMarkup();
}

const controlNavTab = function() {
  dashboardView.addHandlerNavTabs(model.renderTab);
}

const controlFundTransferView = async function() {
  await Delay(1500);
  fundTransferView.addHandlerCopyRef(model.copyRefLink);
  fundTransferView.activeBtn();
}


function init() {
  controlDashboard();
  controlFundTransferView();
  controlNavTab();
  NAV_TOGGLE_BTN();


  model.getLocalStorage();
  model.initTheme();

}

init();
