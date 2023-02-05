import View from './View.js';
import { updateURL } from '../helper.js'

class loginView extends View {
  _parentElem = document.querySelector('main');
  _form;

  _generateMarkup() {
    return `
    <section class="form__section">
      <div class="form__section__logo--lg">
        <img class="form__section__img" loading='lazy' src="./src/images/m_logo.jpg" alt="Slack (website logo)">
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
              <use href="./src/images/icons.svg#icon-eye-slash"></use>
            </svg>
            <input class="input__label__input" type='password' name='password' id='password'>
            <label class="input__label__label" for="password">Password</label>
          </div>
          
          <div class="message-cont">
            <p class="message"></p>
          </div>
          
          <a class='form-link reset-password' href='/'>Forget your password?</a>
          
          <button class="btn btn-light-blue form__btn" type="submit">Log in</button>

          <p class="form-link signup--login">Don't have account yet?<a data-signup='signup' href=''>Sign up</a></p>
        </form>
      </div>
    </section>`
  }

  init(router, loginUser, sendEmailVerif, logoutUser, getUserDataAndUserPic, initHome) {
    this._form = document.querySelector('form');
    this.setTitle('Log In || Slack');
    this.renderTab = router;
    this.isFocus(this._form);
    this.getLoginCredentials(loginUser, sendEmailVerif, logoutUser, getUserDataAndUserPic, initHome);
    this.formLinkRedirects();
    this.togglePasswordInputType();
  }

  getLoginCredentials(loginUser, sendEmailVerif, logoutUser, getUserDataAndUserPic, initHome) {
    this._form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = [...new FormData(this._form)];
      const userObj = Object.fromEntries(fd);

      this.#getUserFromFirebase(userObj, loginUser, sendEmailVerif, logoutUser, getUserDataAndUserPic, initHome);
    })
  }

  async #getUserFromFirebase(userObj, loginUser, sendEmailVerif, logoutUser, getUserDataAndUserPic, initHome) {
    try {
      const { email, password } = userObj;

      if (email) await this.renderMessage('Checking information', 'success', 1000);

      const user = await loginUser(email, password);

      // send verification if email not verified
      if (!user.emailVerified) {
        sendEmailVerif();
        //signout the user 
        logoutUser();
        throw new Error(`Your email is not verified. We have sent email verification message on your mail. please verify your email, check your inbox/spam tab`);
      }

      await this.renderMessage('Getting user data', 'success', 2000);

      //get user data && image from firebase & update user obj
      const res = await getUserDataAndUserPic(this._data);

      if (res) await this.renderMessage('Fetched data successfully', 'success', 1500);

      if (!user) throw Error('You need to login again');

      await this.renderMessage('Logging User', 'success', 2000);

      //if users exist update url and call router to redirect users to login page else firebase will throw an error 

      //render nav & footer
      initHome();

      updateURL('dashboard');
      sessionStorage.setItem('isLogin', true);

      await this.renderTab();
    } catch (err) {
      await this.renderMessage(err, 'error', 2000);
    }
  }

  formLinkRedirects(forgetPassword) {
    this._form.addEventListener('click', e => {
      if (e.target.matches('.form-link') || e.target.closest('.form-link')) {
        e.preventDefault();

        if (e.target.closest('.signup--login')) this.redirectToSignUp('signup');
        if (e.target.matches('.reset-password')) this.redirectToResetPass('reset password');
      }
    })
  }

  async redirectToSignUp(redirectTo) {
    try {
      updateURL(redirectTo);
      await this.loader();
      await this.Delay(2000);
      await this.renderTab();
    } catch (err) {
      this.renderMessage('refresh the page and retry ' + err, 'error', 2000)
    }
  }

  async redirectToResetPass(redirectTo) {
    try {
      updateURL(redirectTo);
      await this.renderTab();
    } catch (err) {
      this.renderMessage(err.message, 'error', 2000);
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
          useElem.setAttribute('href', './src/images/icons.svg#icon-eye');
          break;
        case 'text':
          inputPassElem.setAttribute('type', 'password');
          useElem.setAttribute('href', './src/images/icons.svg#icon-eye-slash');
          break
        default:
          return
      }
    })
  }
}

export default new loginView();