import View from '../View.js';
import { updateURL } from '../../helper.js';
import websiteImage from '../../../images/m_logo.jpg';
import icons from '../../../images/icons.svg';

class loginView extends View {
  _parentElem = document.querySelector('main');
  _form;
  #loginBtn

  _generateMarkup() {
    return `
    <section class="form__section">
      <div class="form__section__logo--lg">
        <img class="form__section__img" src="${websiteImage}" alt="website logo">
      </div>

      <div class="login__form__cont form__container form__container--blur">

        <h2 class="form__container__heading login__heading">Login to your account</h2>

        <form class="login__form" >
          <div class="input__label">
            <input class="input__label__input"  type="email" id="email" name='email'/>
            <label class="input__label__label" for="email">Email</label>
          </div>
          
          <div class="input__label">
            <svg data-show-password class='sm-svg input__label__password'>
              <use href="${icons}#icon-eye-slash"></use>
            </svg>
            <input class="input__label__input" type='password' name='password' id='password'>
            <label class="input__label__label" for="password">Password</label>
          </div>
          
          ${this.messageMarkup()}
          
          <a class='form-link reset-password' href='/'>Forget your password?</a>
          
          <button class="btn btn-light-blue form__btn" data-form-btn type="submit">Log in</button>

          <p class="form-link signup-login">Don't have account yet?<a data-signup='signup' href=''>Sign up</a></p>
        </form>
      </div>
    </section>`
  }

  init(helper) {
    this._form = document.querySelector('form');
    this.setTitle('Log In || Slack');
    this.renderTab = helper.renderTab;
    this.placeholderLabelToggle(this._form);
    this.getLoginCredentials(helper);
    this.formLinkRedirects();
    this.togglePasswordInputType();
  }

  getLoginCredentials(helper) {
    this._form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = [...new FormData(this._form)];
      const userObj = Object.fromEntries(fd);

      this.#getUserFromFirebase(userObj, helper);
    })
  }

  async #getUserFromFirebase(userObj, handler) {
    try {
      const { email, password } = userObj;

      this.toggleBtnState();
      if (email) await this.renderMessage('Checking information', 'success', 500);

      const user = await handler.loginUser(email, password);

      // send verification if email not verified
      if (!user.emailVerified) {
        const { sendEmailVerif, logoutUser } = handler;
        sendEmailVerif();
        //signout the user 
        logoutUser();
        throw new Error(`Your email is not verified. We have sent email verification message on your mail. please verify your email and try again. \n check your inbox/spam tab`);
      }

      //throw error if user not found
      if (!user) throw Error('You need to login again');

      await this.renderMessage('Getting user data', 'success', 500);

      //get user data && image from firebase & update user obj
      const res = await handler.getUserDataAndUserPic(this._data);

      if (res) await this.renderMessage('Fetched data successfully', 'success', 500);

      await this.renderMessage('Logging User', 'success', 500);

      //if users exist update url and call router to redirect users to login page else firebase will throw an error 

      //render nav & footer
      handler.initHome(this._data);

      updateURL('dashboard');
      sessionStorage.setItem('isLogin', true);

      await this.renderTab();
    } catch (err) {
      console.log(err);
      await this.renderMessage(err, 'error', 1000);
      this.toggleBtnState(true);
    }
  }

  formLinkRedirects(forgetPassword) {
    this._form.addEventListener('click', e => {
      if (e.target.matches('.form-link') || e.target.closest('.form-link')) {
        e.preventDefault();

        if (e.target.closest('.signup-login')) this.redirectTo('signup');
        if (e.target.matches('.reset-password')) this.redirectTo('reset password');
      }
    })
  }

  async redirectTo(redirectTo) {
    try {
      updateURL(redirectTo);
      await this.renderTab();
    } catch (err) {
      this.renderMessage('refresh the page and retry ' + err, 'error', 2000)
    }
  }

  togglePasswordInputType() {
    const svgElem = document.querySelector('[data-show-password]');
    const useElem = svgElem.querySelector('use');

    svgElem.addEventListener('click', e => {
      const inputPassElem = document.querySelector('#password');

      switch (inputPassElem.type) {
        case 'password':
          inputPassElem.setAttribute('type', 'text');
          useElem.setAttribute('href', `${icons}#icon-eye`);
          break;
        case 'text':
          inputPassElem.setAttribute('type', 'password');
          useElem.setAttribute('href', `${icons}#icon-eye-slash`);
          break
        default:
          return
      }
    })
  }
}

export default new loginView();