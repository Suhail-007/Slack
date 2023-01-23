import * as model from './model.js';
import { firebaseApp } from './firebase-app.js';

class App {
  async init() {
    model.getLocalStorage();
    model.initThemeLocalStorage();
    model.renderFromHistory();
    model.windowLoad();
  }
}

const app = new App();
// app.init();