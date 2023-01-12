import View from '../View.js'
import { chartTypes } from '../../config.js'
import { theme } from '../../model.js';

class ProfileView extends View {
  _parentElem = document.querySelector('main');
  _settingsElem;

  renderProfileView() {
    //using clear fpr temporary here will add real data from api and call render function then
    this.clear();
    this._generateHTML();
  }

  _generateHTML() {
    const html = `
      <section class="section section__profile">
        <div class="section__heading tab-heading u-letter-spacing-small">
          <h2>Profile</h2>
        </div>
    
        <div class="profile__cont">
          <div class="profile__cont-photo">
            <img src="./src/images/user.png" alt="user profile image">
          </div>
          <div>
            <p class="profile__user-name">Suhail Qureshi</p>
            <p class="profile__bio">To never give up...</p>
          </div>
        </div>
    
        <div class="profile__info">
          <h3 class="tab-heading u-letter-spacing-small">User Info</h3>
          <div>
            <p>Gender</p>
            <p>Male</p>
          </div>
          <div>
            <p>Birthday</p>
            <p>June 5, 1998</p>
          </div>
          <div>
            <p>City</p>
            <p>new Delhi</p>
          </div>
          <div>
            <p>Country</p>
            <p>India</p>
          </div>
          <div>
            <p>Phone Number</p>
            <p>+919643938991</p>
          </div>
          <div>
            <p>Email</p>
            <p class="email">suhuq007@gmail.com</p>
          </div>
        </div>
    
        <hr>
    
        <div data-settings class="section__settings">
          <h3 class="tab-heading u-letter-spacing-small">Settings</h3>
            
          <div>
            <h4>Theme Mode</h4>
            <div>
              <label for="theme">Theme</label>
              <select data-select='theme' name="theme" id="theme">
                <option ${this._isSelectedValue('system default')} value="system default">system default</option>
                <option ${this._isSelectedValue('light')} value="light">light</option>
                <option ${this._isSelectedValue('dark')} value="dark">dark</option>
              </select>
            </div>
          </div>
    
          <div>
            <h4 class="u-letter-spacing-small">Chart Settings</h4>
            <div>
              <label for="chartOne">Chart 1</label>
              <select data-select='chartOne' name="chartOne" id="chartOne">
                <option ${this._isSelectedValue('doughtnut', 'chartOne')} value="doughnut">Doughnut</option>
                <option ${this._isSelectedValue('line', 'chartOne')} value="line">Line</option>
                <option ${this._isSelectedValue('bar', 'chartOne')} value="bar">Bar</option>
                <option ${this._isSelectedValue('pie', 'chartOne')} value="pie">Pie</option>
              </select>
            </div>
              
            <div>
              <label for="chartTwo">Chart 2</label>
              <select data-select='chartTwo' name="chartTwo" id="chartTwo">
                <option ${this._isSelectedValue('line', 'chartTwo')} value="line">Line</option>
                <option ${this._isSelectedValue('bar', 'chartTwo')} value="bar">Bar</option>
                <option ${this._isSelectedValue('pie', 'chartTwo')} value="pie">Pie</option>
                <option ${this._isSelectedValue('doughnut', 'chartTwo')} value="doughnut">Doughnut</option>
              </select>
            </div>
          </div>
        </div>
      </section>`
    this._parentElem.insertAdjacentHTML('afterbegin', html);
  }

  addHandlerSettings(handler) {
    this._settingsElem = document.querySelector('[data-settings]');
    this._settingsElem.addEventListener('click', handler);
  }

  _isSelectedValue(value, selectOption = 'theme') {
    value = value.toLowerCase();

    if (selectOption === 'theme') {
      const selectedTheme = theme.mode;
      if (selectedTheme === value) return 'selected';
    }

    if (selectOption === 'chartOne') {
      const selectedTheme = chartTypes.chartOne;
      if (selectedTheme === value) return 'selected';
    }

    if (selectOption === 'chartTwo') {
      const selectedTheme = chartTypes.chartTwo;
      if (selectedTheme === value) return 'selected'
    }
  }
}

export default new ProfileView();