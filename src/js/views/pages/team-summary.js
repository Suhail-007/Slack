import View from '../View.js';
import { Inconvenience } from '../../components/inconvenience.js';

class TeamSummary extends View {
  _parentElem = document.querySelector('main');

  _generateMarkup() {
    return `
    <section class='section section-team'>
    <h2>Team Summary</h2>
    
      ${Inconvenience()}
      
      <div class="message-cont">
        <p class="message"></p>
      </div>
    </section>
    `
  }
  
  init() {
    this.setTitle('Team Summary || Slack');
  }
}

export default new TeamSummary();