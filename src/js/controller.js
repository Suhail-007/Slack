import * as model from './model.js';
import fundTransferView from './views/dashboard/fundTransferView.js';
import dashboardView from './views/dashboard/dashboardView.js';
import profileView from './views/profileView.js'


dashboardView.renderDashboardView();
//profileView._generateHTML();

function init() {
//  model.generateHTML();
  model.NAV_TOGGLE_BTN();
}

init();
