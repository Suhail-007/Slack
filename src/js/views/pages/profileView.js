import View from '../View.js'
import { chartTypes } from '../../config.js'
import { setLocalStorage } from '../../helper.js'
import { theme } from '../../model.js';

class ProfileView extends View {
  _parentElem = document.querySelector('main');
  _settingsElem;

  _generateMarkup() {
    return `
      <section class="section section__profile">
        <div class="section__heading tab-heading u-letter-spacing-small">
          <h2>Profile</h2>
        </div>
    
        <div class="profile__cont">
          <figure class="profile__cont-photo">
            <img loading="lazy" src="${this._data.data.profilePic}" alt="user profile">
          </figure>
          <div class='profile__bio'>
            <p class="profile__user-name">${this._data.data.fullname}</p>
            <p class="profile__bio">To never give up...</p>
          </div>
        </div>
    
        <div class="profile__info">
          <h3 class="tab-heading u-letter-spacing-small">User Info</h3>
          <div>
            <p>Gender</p>
            <p>${this._data.data.gender}</p>
          </div>
          <div>
            <p>Birthday</p>
            <p>${this._data.data.dob}</p>
          </div>
          <div>
            <p>City</p>
            <p>${this._data.data.state}</p>
          </div>
          <div>
            <p>Country</p>
            <p>${this._data.data.country}</p>
          </div>
          <div>
            <p>Phone Number</p>
            <p>${this._data.data.phone}</p>
          </div>
          <div>
            <p>Email</p>
            <p class="email">${this._data.data.userEmail}</p>
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
                <option ${this.#isSelectedValue('system default')} value="system default">system default</option>
                <option ${this.#isSelectedValue('light')} value="light">light</option>
                <option ${this.#isSelectedValue('dark')} value="dark">dark</option>
              </select>
            </div>
          </div>
    
          <div>
            <h4 class="u-letter-spacing-small">Chart Settings</h4>
            <div>
              <label for="chartOne">Chart 1</label>
              <select data-select='chartOne' name="chartOne" id="chartOne">
                <option ${this.#isSelectedValue('doughtnut', 'chartOne')} value="doughnut">Doughnut</option>
                <option ${this.#isSelectedValue('line', 'chartOne')} value="line">Line</option>
                <option ${this.#isSelectedValue('bar', 'chartOne')} value="bar">Bar</option>
                <option ${this.#isSelectedValue('pie', 'chartOne')} value="pie">Pie</option>
              </select>
            </div>
              
            <div>
              <label for="chartTwo">Chart 2</label>
              <select data-select='chartTwo' name="chartTwo" id="chartTwo">
                <option ${this.#isSelectedValue('line', 'chartTwo')} value="line">Line</option>
                <option ${this.#isSelectedValue('bar', 'chartTwo')} value="bar">Bar</option>
                <option ${this.#isSelectedValue('pie', 'chartTwo')} value="pie">Pie</option>
                <option ${this.#isSelectedValue('doughnut', 'chartTwo')} value="doughnut">Doughnut</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="section__error">
          <p class="section__error__msg"></p>
        </div>
        
        <div data-btns-cont class='section__profile__buttons'>
          <button type='button' data-cta='edit' class='btn btn-edit section__profile__buttons--edit'>Edit Profile</button>
          <button type='button' data-cta='delete' class='btn btn-delete section__profile__buttons--delete'>Delete Profile</button>
        </div>
      </section>`
  }

  init(handler, deleteUserAndData) {
    this.#addHandlerSettings(handler);
    this.#callToActionBtns(deleteUserAndData);
  }

  #addHandlerSettings(handler) {
    this._settingsElem = document.querySelector('[data-settings]');
    this._settingsElem.addEventListener('click', handler);
  }

  #isSelectedValue(value, selectOption = 'theme') {
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

  #callToActionBtns(deleteUserAndData) {
    const btnsCont = document.querySelector('[data-btns-cont]');

    btnsCont.addEventListener('click', async e => {
      try {
        const btn = e.target.dataset.cta;
        if (btn === 'edit') console.log('dj');
        if (btn === 'delete') await this.#deleteAccount(deleteUserAndData);
      } catch (err) {
        console.log(err);
        this.renderMessage(err.message, 'error', 2000);
      }
    });
  }

  async #deleteAccount(deleteUserAndData) {
    try {
      const userConfirmation = confirm('Are you sure you want to delete your account? once done this operation can\'t be reversed');

      if (!userConfirmation) return this.renderMessage('Great decision!', 'success', 3000);

      await deleteUserAndData(this._data.data);
      //set wasLogin to false 
      setLocalStorage('wasLogin', false);
    } catch (err) {
      throw err
    }
  }
}

export default new ProfileView();