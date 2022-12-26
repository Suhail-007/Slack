import View from './View.js';

class homeView extends View {
  _parentElem = document.body;
  generateHomeMarkup() {
    this._parentElem.insertAdjacentHTML('beforebegin', this.generateHeaderMarkup());
    this._parentElem.insertAdjacentHTML('beforeend', this.generateFooterMarkup());
  }

  generateHeaderMarkup() {
    return `
      <header>
        <div class="header">
          <div class="website-logo-container">
            <div class="website-logo">
              <img src="src/images/m_logo.jpg" alt="Slack (website logo)">
            </div>
            <p class="website_name">Slack</p>
          </div>
    
          <!----this is for desktop version---->
          <div class=" user_profile_container user_profile_container_desktop hidden">
            <p class="username">Suhail Qureshi</p>
            <div class="user_profile">
              <img src="./src/images/user.png" alt="user profile desktop">
            </div>
          </div>
        </div>
    
        <div class="nav__container">
          <div class="nav__container__btn" data-navBtn-container>
            <svg>
              <use xlink:href="src/images/icons.svg#icon_hamburger-menu"></use>
            </svg>
          </div>
    
          <nav class="navbar" data-nav>
            <div class="user-profile-container user-profile-container_mob">
              <p class="user-profile-container_username">Suhail Qureshi</p>
              <div class="user-profile-container_profile">
                <img src="./src/images/user.png" alt="user profile mob">
              </div>
            </div>
    
            <ul>
              <li data-nav="dashboard" class="nav_item">
                <svg>
                  <use xlink:href="src/images/icons.svg#icon_dashboard"></use>
                </svg>
                <span class="nav__item--name">Dashboard</span>
              </li>
              <li data-nav="profile" class="nav_item">
                <svg>
                  <use href="src/images/icons.svg#icon_profile"></use>
                </svg>
                <span class="nav__item--name">Profile</span>
              </li>
              <li data-nav="invest wallet" class="nav_item">
                <svg>
                  <use xlink:href="src/images/icons.svg#icon_invest-wallet"></use>
                </svg>
    
                <span class="nav__item--name">Invest Wallet</span>
              </li>
              <li data-nav="team summary" class="nav_item">
                <svg>
                  <use href="src/images/icons.svg#icon_team-summary"></use>
                </svg>
                <span class="nav__item--name">Team summary </span>
              </li>
              <li data-nav="income" class="nav_item">
                <svg>
                  <use xlink:href="src/images/icons.svg#icon_income"></use>
                </svg>
                <span class="nav__item--name">Income</span>
              </li>
              <li data-nav="withdraw wallet" class="nav_item">
                <svg>
                  <use xlink:href="src/images/icons.svg#icon_withdraw-wallet"></use>
                </svg>
                <span class="nav__item--name">withdrawal wallet</span>
              </li>
              <li data-nav="deposit funds transfer" class="nav_item">
                <svg class="i">
                  <use href="src/images/icons.svg#icon-wallet"></use>
                </svg>
                <span class="nav__item--name">deposit funds transfer</span>
              </li>
              <li data-nav="reports" class="nav_item">
                <svg>
                  <use xlink:href="src/images/icons.svg#icon_report"></use>
                </svg>
                <span class="nav__item--name">Reports</span>
              </li>
              <li data-nav="structure balance" class="nav_item">
                <svg>
                  <use xlink:href="src/images/icons.svg#icon_structure-balance"></use>
                </svg>
                <span class="nav__item--name">Structure balance</span>
              </li>
    
              <li class="nav_item">
                <svg>
                  <use xlink:href="src/images/icons.svg#icon_logout"></use>
                </svg>
                <span class="nav__item--name">Logout</span>
              </li>
            </ul>
          </nav>
        </div>
      </header>`
  }

  generateFooterMarkup() {
    return `
    <footer class="footer">
      <div class="footer__links-cont">
        <a href="#">Contact us</a>
        <a href="#">Link</a>
        <a href="#">Write to us</a>
        <a href="#">link</a>
        <a href="#">Terms</a>
        <a href="#">link</a>
        <a href="#">Policy</a>
        <a href="#">link</a>
        <a href="#">Author</a>
        <a href="#">link</a>
      </div>
  
      <p>&copy; Slash 2022-23</p>
    </footer>`
  }

}

export default new homeView();