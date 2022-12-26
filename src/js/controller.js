import * as model from './model.js';
import homeView from './views/homeView.js';
import dashboardView from './views/dashboard/dashboardView.js';
import fundTransferView from './views/dashboard/renderReferralTransferView.js';
import profileView from './views/profileView.js';
import { NAV_TOGGLE_BTN } from './helper.js';
// import { firebaseApp } from './firebase-app.js';


class App {
  async init() {
    model.getLocalStorage();
    model.initThemeLocalStorage();
    homeView.generateHomeMarkup();

    await this.controlDashboard();
    NAV_TOGGLE_BTN();
    this.controlNavTab();
    this.controlFundTransferView();
  }

  async controlDashboard() {
    await dashboardView.loader();
    await dashboardView.Delay(1000);
    dashboardView.generateDashboardSections();
  }

  controlNavTab() {
    dashboardView.addHandlerNavTabs(model.renderTab);
  }

  controlFundTransferView() {
    fundTransferView.addHandlerCopyRef(model.copyRefLink);
    fundTransferView.activeBtn();
  }
}

const app = new App();

app.init();