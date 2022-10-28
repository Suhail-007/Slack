import * as model from './model.js';
import fundTransferView from './views/dashboard/fundTransferView.js';
import dashboardView from './views/dashboard/dashboardView.js';
import profileView from './views/profileView.js'
import { NAV_TOGGLE_BTN } from './helper.js'


const controlDashboard = function() {
  dashboardView.renderDashboardMarkup();
}

const controlNavTab = function() {
  dashboardView.addHandlerNavTabs(model.renderTab);
}

const controlFundTransferView = function() {
  fundTransferView.addHandlerCopyRef(model.copyRefLink);
  fundTransferView.activeBtn();
}

function init() {
  controlDashboard();
  controlFundTransferView();
  controlNavTab();
  NAV_TOGGLE_BTN();
}

init();
