import View from '../View.js'
import reAuthUser from '../components/reAuthUser.js'
import { updateURL } from '../../helper.js'

class ProfileView extends View {
  _parentElem = document.querySelector('main');
  _settingsElem;
  _reAuthUserEmailPass;
  _edit = false;

  _generateMarkup() {
    const { personalInfo, extraInfo, preference } = this._data.data;
    return `
      <section class="section section__profile">
        <div class="section__heading tab-heading u-letter-spacing-sm">
          <h2>Profile</h2>
        </div>
    
        <div class="profile__cont">
          <figure class="profile__cont-photo">
            <img class='dp' loading="lazy" src="${this._setUserPic(extraInfo)}" alt="user profile">
          </figure>
          <div class='profile__bio'>
            <p class="profile__user-name">${personalInfo.fullname}</p>
            <p class="profile__bio">${extraInfo.bio}</p>
          </div>
        </div>
    
        <div class="profile__info">
          <h3 class="tab-heading u-letter-spacing-sm">User Info</h3>
          ${this.userInfo(personalInfo)}
        </div>
    
        <hr>
    
        <div data-settings class="section__settings">
          <h3 class="tab-heading u-letter-spacing-sm">Settings</h3>
            
          <div>
            <h4>Theme Mode</h4>
            <div class='u-LineBar'>
              <label for="theme">Theme</label>
              <select data-select='theme' name="theme" id="theme">
                <option ${this.#isSelected('system default')} value="system default">system default</option>
                <option ${this.#isSelected('light')} value="light">light</option>
                <option ${this.#isSelected('dark')} value="dark">dark</option>
              </select>
            </div>
          </div>
    
          <div>
            <h4 class="u-letter-spacing-sm">Chart Settings</h4>
            ${this.chartsOptionsMarkup(preference.charts.roi, 'ROI', 'roi')}
            ${this.chartsOptionsMarkup(preference.charts.bi, 'Binary Income', 'bi')}
          </div>
        </div>
        
        <div class="message-cont">
          <p class="message"></p>
        </div>
        
        <div data-btns-cont class='section__profile__buttons'>
          <button type='button' data-cta='edit' class='btn btn-edit section__profile__buttons--edit'>Edit Profile</button>
          <button type='button' data-cta='delete' class='btn btn-delete section__profile__buttons--delete'>Delete Profile</button>
        </div>
        
        <!------ReAuthForm---->
        ${reAuthUser.renderData(false)}
      </section>
      `
  }

  chartsOptionsMarkup(chart, chartTitle, selected) {
    return `
    <div class='u-LineBar'>
      <label for="${chart}">${chartTitle} Chart</label>
      <select data-select='${chart}' name="${chart}" id="${chart}">
        <option ${this.#isSelected('doughtnut', selected)} value="doughnut">Doughnut</option>
        <option ${this.#isSelected('line', selected)} value="line">Line</option>
        <option ${this.#isSelected('bar', selected)} value="bar">Bar</option>
        <option ${this.#isSelected('pie', selected)} value="pie">Pie</option>
      </select>
    </div>`
  }

  userInfo(user) {
    const arr = [];
    for (let key in user) {
      if (key === 'fullname') continue
      arr.push(`
        <div class='u-LineBar'>
          <p>${key}</p>
          <p>${user[key]}</p>
        </div>
      `);
    }
    return arr.sort().join('');
  }


  init(settings, deleteUserAndData, loginUser, renderTab) {
    this.setTitle('Profile || Slack');
    this.#addHandlerSettings(settings);
    this.#callToActionBtns(deleteUserAndData, loginUser, renderTab);
  }

  #addHandlerSettings(settings) {
    this._settingsElem = document.querySelector('[data-settings]');
    this._settingsElem.addEventListener('click', settings);
  }

  #isSelected(value, selectOption = 'theme') {
    value = value.toLowerCase();
    const { charts } = this._data.data.preference;
    let isSelected;

    if (selectOption === 'theme') {
      isSelected = this._data.data.preference.theme;
      if (isSelected === value) return 'selected';
    }

    if (selectOption === 'roi') {
      isSelected = charts.roi
      if (isSelected === value) return 'selected';
    }

    if (selectOption === 'bi') {
      isSelected = charts.bi
      if (isSelected === value) return 'selected'
    }
  }

  #callToActionBtns(deleteUserAndData, loginUser, renderTab) {
    const btnsCont = document.querySelector('[data-btns-cont]');

    btnsCont.addEventListener('click', async e => {
      try {
        const btn = e.target.dataset.cta;
        if (btn === 'edit') {
          this._edit = true;
          updateURL(`profileEdit&edit=${this._edit}`);
          renderTab();
          return
        }
        if (btn === 'delete') await this.#deleteAccount(deleteUserAndData, loginUser);
      } catch (err) {
        throw err;
      }
    });
  }

  async #deleteAccount(deleteUserAndData, loginUser) {
    try {
      reAuthUser.showForm();

      this._reAuthUserEmailPass = await reAuthUser.getReAuthInfo();
      //hide form
      reAuthUser.hideForm();

      const { reAuthEmail: email, reAuthPass: password } = this._reAuthUserEmailPass;

      //if user cancel the process exit from fn
      if (!email || !password) return;

      await this.Delay(1000);

      const userConfirmation = confirm('Are you sure you want to delete your account? once done this operation can\'t be reversed');

      if (!userConfirmation) return this.renderMessage('Great! You decided to stay <3', 'def', 5000);

      this.renderMessage('re-authenticating', 'success', 1500);

      //login user again
      const currUser = await loginUser(email, password);

      await this.renderMessage('Deleting your account', 'success', 1500);

      const isDeleted = await deleteUserAndData(this._data.data, currUser);

      if (isDeleted) await this.renderMessage('Account deleted, Redirecting to login page', 'success', 2000);

      //set isLogin to false 
      sessionStorage.removeItem('isLogin');
      updateURL('_', true);
    } catch (err) {
      throw err
    }
  }
}

export default new ProfileView();