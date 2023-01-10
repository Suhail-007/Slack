import * as model from './model.js';
import loginView from './views/loginView.js';
import { NAV_TOGGLE_BTN } from './helper.js';
import { firebaseApp } from './firebase-app.js';


class App {
  async init() {
    model.getLocalStorage();
    model.initThemeLocalStorage();
    model.renderFromHistory();
    model.windowLoad();

    NAV_TOGGLE_BTN();
  }
}

const app = new App();
app.init();