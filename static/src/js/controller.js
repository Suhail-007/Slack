import * as model from './model.js';
import homeView from './views/homeView.js';
import loginView from './views/loginView.js';
import signUpView from './views/signupView.js';
import dashboardView from './views/dashboard/dashboardView.js';
import fundTransferView from './views/dashboard/renderReferralTransferView.js';
import profileView from './views/profileView.js';
import { NAV_TOGGLE_BTN } from './helper.js';
// import { firebaseApp } from './firebase-app.js';


class App {
  async init() {
    model.getLocalStorage();
    model.initThemeLocalStorage();
    model.renderFromHistory();
    model.windowLoad();
    
    NAV_TOGGLE_BTN();
    loginView.preventAnchorDefault(model);
    // homeView.generateHomeMarkup();
    // await this.controlDashboard();
    // this.controlNavTab();
    // this.controlFundTransferView();
  }

  // async controlDashboard() {
  //   await dashboardView.loader();
  //   await dashboardView.Delay(1000);
  //   dashboardView.generateDashboardSections();
  // }

  // controlNavTab() {
  //   dashboardView.addHandlerNavTabs(model.renderTab);
  // }

  // controlFundTransferView() {
  //   fundTransferView.addHandlerCopyRef(model.copyRefLink);
  //   fundTransferView.activeBtn();
  // }
}

const app = new App();

app.init();
// model.renderTab()