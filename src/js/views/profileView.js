import { chartTypes } from '../helper.js'
import { theme } from '../model.js';

class ProfileView {
  _parentElement = document.querySelector('main');
  _settingsElem;

  renderProfileView() {
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
            <img src="src/images/user.png" alt="user profile image">
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
                <option ${this._isSelectedValue('doughtnut', 'typeOne')} value="doughnut">Doughnut</option>
                <option ${this._isSelectedValue('line', 'typeOne')} value="line">Line</option>
                <option ${this._isSelectedValue('bar', 'typeOne')} value="bar">Bar</option>
                <option ${this._isSelectedValue('pie', 'typeOne')} value="pie">Pie</option>
              </select>
            </div>
              
            <div>
              <label for="chartTwo">Chart 2</label>
              <select data-select='chartTwo' name="chartTwo" id="chartTwo">
                <option ${this._isSelectedValue('line', 'typeTwo')} value="line">Line</option>
                <option ${this._isSelectedValue('bar', 'typeTwo')} value="bar">Bar</option>
                <option ${this._isSelectedValue('pie', 'typeTwo')} value="pie">Pie</option>
                <option ${this._isSelectedValue('doughnut', 'typeTwo')} value="doughnut">Doughnut</option>
              </select>
            </div>
          </div>
        </div>
    
      </section>`

    this._parentElement.insertAdjacentHTML('beforeend', html);
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

    if (selectOption === 'typeOne') {
      const selectedTheme = chartTypes.typeOne;
      if (selectedTheme === value) return 'selected';
    }

    if (selectOption === 'typeTwo') {
      const selectedTheme = chartTypes.typeTwo;
      if (selectedTheme === value) return 'selected'
    }
  }
}
export default new ProfileView();