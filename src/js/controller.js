import {renderFromHistory, windowLoad } from './model.js';
import '../sass/main.scss';

class App {
  async init() {
    renderFromHistory();
    windowLoad();
  }
}

const app = new App();
app.init();