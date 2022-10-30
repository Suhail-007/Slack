import { theme } from '../model.js';

class ProfileView {
  _parentElement = document.querySelector('main');
  _settingsElem;

  renderProfileView() {
    this._generateHTML();
  }

  _generateHTML() {
    const html = `
      <section class="profile_container">
        <div class="tab_heading heading">
          <h2>Profile</h2>
        </div>
    
        <div class="user_name_bio_container">
          <div class="user_image_container">
            <img src="src/images/user.png" alt="user profile image">
          </div>
          <div>
            <p class="user_name">Suhail Qureshi</p>
            <p class="user_bio">To never give up...</p>
            </div>
        </div>
    
        <hr>
    
        <div class="user_info_container">
          <h2 class="heading">User Info</h2>
          <div>
            <p>Gender</p>
            <p>Male</p>
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
    
        <div data-settings class="settings">
          <h2 class="">Settings</h2>
            
          <div>
            <h3>Theme Mode</h3>
            <div>
              <label for="theme">Theme</label>
              <select data-select='theme' name="theme" id="theme">
                <option ${theme.mode === 'system default' ? 'selected' : ''} value="system default">system default</option>
                <option ${theme.mode === 'light' ? 'selected' : ''} value="light">light</option>
                <option ${theme.mode === 'dark' ? 'selected' : ''} value="dark">dark</option>
              </select>
            </div>
          </div>
    
          <div>
            <h3>Chart Settings</h3>
            <div>
              <label for="chartOne">Chart 1</label>
              <select data-select='chartOne' name="chartOne" id="chartOne">
                <option selected value="Doughnut">Doughnut</option>
                <option value="line">Line</option>
                <option value="bar">Bar</option>
                <option value="pie">Pie</option>
              </select>
            </div>
              
            <div>
              <label for="chartTwo">Chart 2</label>
              <select data-select='chartTwo' name="chartTwo" id="chartTwo">
                <option selected value="line">Line</option>
                <option value="bar">Bar</option>
                <option value="pie">Pie</option>
                <option value="doughnut">Doughnut</option>
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

/*  _checkSelectedThemeValue(themeMode) {
    if (themeMode === 'system default') return 'selected';
    if (themeMode === 'light') return 'selected';
    if (themeMode === 'dark') return 'selected';
  }*/
}

export default new ProfileView();