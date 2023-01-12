import * as model from './model.js';
import { firebaseApp } from './firebase-app.js';
import homeView from './views/homeView.js';

class App {
  async init() {
    model.getLocalStorage();
    model.initThemeLocalStorage();
    model.renderFromHistory();
    model.windowLoad();

    // this.#controllerHome();
  }

  // #controllerHome() {
  //   homeView.navTab();
  // }
}

const app = new App();
app.init();