import { systemDefaultTheme, renderFromHistory, windowLoad } from './model.js';
import { firebaseApp } from './firebase-app.js';

class App {
  async init() {
    systemDefaultTheme();
    renderFromHistory();
    windowLoad();
  }
}

const app = new App();
app.init();