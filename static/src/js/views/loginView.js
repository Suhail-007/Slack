import View from './View.js';
import { updateURL } from '../helper.js'

class loginView extends View {
  _parentElem = document.querySelector('main');

  _generateMarkup() {
    return `
    <section class="form__section">
      <div class="form__section__logo--lg">
        <img class="form__section__img" loading='lazy' src="/static/src/images/m_logo.jpg" alt="Slack (website logo)">
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
              <use href="./static/src/images/icons.svg#icon-eye"></use>
            </svg>
            <input class="input__label__input" type='text' name='password' id='password'>
            <label class="input__label__label" for="password">Password</label>
          </div>
          
          <section class="section__error">
            <p class="section__error__msg"></p>
          </section>
          
          <button class="form__btn login-btn" type="submit">Log in</button>

          <p class="signup--login">Don't have account yet?<a href="/signup">Sign up</a></p>
        </form>
      </div>
    </section>`
  }

  initFormFunctions(router, loginUser) {
    this.isFocus();
    this.getLoginCredentials(router, loginUser);
    this.setTitle('Log In || Slack')
  }

  isFocus() {
    const form = document.querySelector('form');

    form.addEventListener('input', e => {

      if (e.target.id === 'email' || e.target.id === 'password') {
        const inputId = e.target.id;
        const input = form.querySelector(`#${inputId}`);

        input.addEventListener('blur', e => {
          const label = document.querySelector(`label[for="${inputId}"]`);

          e.target.value !== '' ? label.classList.add('not-empty') : label.classList.remove('not-empty');
        })
      }
    })
  }

  getLoginCredentials(router, loginUser) {
    const form = document.querySelector('form');

    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = [...new FormData(form)];
      const userObj = Object.fromEntries(fd);
      this.#getUserFromFirebase(userObj, router, loginUser);
    })
  }

  async #getUserFromFirebase(userObj, router, loginUser) {
    try {
      const { email, password } = userObj;
      const user = await loginUser(email, password);

      if (user) this.renderError('Logging User', 'success');

      //if users exist update url and call router to redirect users to login page
      //else firebase will throw an error 
      updateURL('/dashboard');
      router()
    } catch (err) {
      this.renderError(err.code, 'error');
    }
  }

  preventAnchorDefault(model) {
    const signupElem = document.querySelector('a[href="/signup"]');

    if (!signupElem) return

    signupElem.addEventListener('click', e => {
      e.preventDefault();
      updateURL(e.target.href);
      model.renderTab();
    })
  }

  togglePasswordInputType() {
    const svgElem = document.querySelector('[data-show-password]');

    svgElem.addEventListener('click', e => {})
  }
}

export default new loginView();