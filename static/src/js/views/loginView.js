import View from './View.js';
import { getUser } from '../firebase-app.js'
import { updateURL } from '../helper.js'

class loginView extends View {
  _parentElem = document.querySelector('main');

  _generateMarkup() {
    return `
    <section class="form">
      <div class="form__website-logo">
        <img loading='lazy' src="/static/src/images/m_logo.jpg" alt="Slack (website logo)">
      </div>

      <div class="form__login">

        <h2 class="form__login__heading">Login to your account</h2>

        <form enctype='multipart/form-data' method='get'>
          <input autocomplete='on' title='example@example.com' type="email" id="email" name='email'/>
          <label for="email">Email</label>

          <input autocomplete='on' type='text' name='password' id='password'>
          <label for="password">Password</label>
          
          <section class="section__error">
            <p class="section__error__msg"></p>
          </section>
          
          <button type="submit">Log in</button>

          <p class="signup">Don't have account yet?<a href="/signup">Sign up</a></p>
        </form>
      </div>
    </section>`
  }

  initFormFunctions(router) {
    this.isFocus();
    this.getLoginCredentials(router);
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

  getLoginCredentials(router) {
    const form = document.querySelector('form');

    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = [...new FormData(form)];
      const userObj = Object.fromEntries(fd);
      this.#getUserFromFirebase(userObj, router)
    })
  }

  async #getUserFromFirebase(userObj, router) {
    try {
      const { email, password } = userObj;
      this._data.user = await getUser(email, password);
      if (!this._data.user) return

      updateURL('/Dashboard');
      router()
    } catch (err) {
      this.renderError(err.code, 'login');
    }
  }

  preventAnchorDefault(model) {
    const signupElem = document.querySelector('a[href="/signup"]');

    signupElem.addEventListener('click', e => {
      e.preventDefault();
      updateURL(e.target.href);
      model.renderTab();
    })
  }
}

export default new loginView();