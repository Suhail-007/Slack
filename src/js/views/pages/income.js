import View from '../View.js';
import { Inconvenience } from '../components/inconvenience.js';

class Income extends View {
  _parentElem = document.querySelector('main');

  _generateMarkup() {
    return `
    <section class='section section-income'>
      <h2>Income</h2>
    
      ${Inconvenience()}
      <div class="message-cont">
        <p class="message"></p>
      </div>
    </section>
    `
  }
  
  init() {
    this.setTitle('Income ||Slack');
  }
}

export default new Income();