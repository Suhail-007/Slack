import createNavLinks from './createNavLink.js';
import { defaultUserPic } from '../config.js';
import icons from '../../images/icons.svg';
import websiteLogo from '../../images/m_logo.jpg';

class headerFooter {
  _parentElem = document.body;

  async generateHomeMarkup(data) {
    try {
      this._data = await data.data;
      this._parentElem.insertAdjacentHTML('afterbegin', this.generateHeaderMarkup());
      this._parentElem.insertAdjacentHTML('beforeend', this.generateFooterMarkup());
    } catch (err) {
      throw err
    }
  }

  removeHeaderFooter() {
    const header = document.querySelector('header')
    const footer = document.querySelector('footer');

    if (!header && !footer) return
    header.remove();
    footer.remove();
  }

  generateHeaderMarkup() {
    return `
      <header>
        <div class="header">
          <div class="website-logo-container">
            <div class="website-logo">
              <img src="${websiteLogo}" alt="website logo">
            </div>
            <p class="website_name">Slack</p>
          </div>
    
          <!----this is for desktop version---->
          <div class=" user_profile_container user_profile_container_desktop hidden">
            <p data-username class="username"><a href='/profile'>${this._data.personalInfo.fullname}</a></p>
            <div class="user_profile">
              <img data-profile-img class='dp' loading="lazy" src="${this._setUserPic(this._data.extraInfo)}" alt="user profile">
            </div>
          </div>
        </div>
    
        <div class="nav__container">
          <div class="nav__container__btn" data-navBtn-container>
            <svg>
              <use xlink:href="${icons}#icon_hamburger-menu"></use>
            </svg>
          </div>
    
          <nav class="navbar" data-nav>
            <div data-nav='profile' class="user-profile-container user-profile-container_mob nav-link">
              <p data-username class="user-profile-container_username">${this._data.personalInfo.fullname}</p>
              <div class="user-profile-container_profile">
                <img data-profile-img class='dp' loading="lazy" src="${this._setUserPic(this._data.extraInfo)}" alt="user profile">
              </div>
            </div>
    
            <ul>
              ${createNavLinks()}
            </ul>
          </nav>
        </div>
      </header>`
  }

  generateFooterMarkup() {
    return `
    <footer class="footer">
      <div class="footer__links-cont grid--two-col">
        <a href="#">Contact us</a>
        <a href="#">Write to us</a>
        <a href="#">Terms & Policy</a>
        <a href="#">Author</a>
      </div>
  
      <p>&copy; Slash 2022-23</p>
    </footer>`
  }

  navTab(renderTab, updateURL) {
    const nav = document.querySelector('[data-nav]');

    nav.addEventListener('click', e => {
      const navLink = e.target.closest('.nav-link').dataset.nav;
      if (!navLink) return
      updateURL(navLink);
      renderTab();
    })
  }

  _setUserPic(user) {
    return user.profilePic ? user.profilePic : defaultUserPic;
  }
}

export default new headerFooter();