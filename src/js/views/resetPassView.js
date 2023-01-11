import View from './View.js';
import { updateURL } from '../helper.js';

class resetPassword extends View {
  _parentElem = document.querySelector('main');

  _generateMarkup() {
    return `
      <section class="form__section">
        <div class="form__section__logo--lg">
          <img class="form__section__img" loading='lazy' src="./src/images/m_logo.jpg" alt="Slack (website logo)">
        </div>
  
        <div class="login__form__cont form__container form__container--blur">
  
          <h2 class="form__container__heading login__heading">Reset your password</h2>
  
          <form class="login__form" >
            <div class="input__label">
              <input class="input__label__input"  type="email" id="email" name='email'/>
              <label class="input__label__label" for="email">Email</label>
            </div>
            
            <section class="section__error">
              <p class="section__error__msg"></p>
            </section>
            
            <button class="form__btn login-btn" type="submit">Reset Password</button>
          </form>
        </div>
      </section>`
  }

  init(resetUserPass, renderTab) {
    const form = document.querySelector('form');
    this.resetUserPassword(resetUserPass);
    this.isFocus(form);
  }

  resetUserPassword(resetUserPass, renderTab) {
    const form = document.querySelector('form');

    form.addEventListener('submit', async e => {
      try {
        e.preventDefault();
        this.btnPressEffect(form);
        await resetUserPass(form.email.value);
        this.renderError('Password reset mail has been sent to your mail', 'success', 1000);
        await this.Delay(2000);
        updateURL('_', true);
        renderTab();
      } catch (err) {
        this.renderError(err, 'error', 2000);
      }
    })
  }
}

export default new resetPassword();