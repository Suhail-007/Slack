import View from '../View.js';
import { updateURL } from '../../helper.js';
import websiteImage from '../../../images/m_logo.jpg';
class resetPassword extends View {
  _parentElem = document.querySelector('main');
  _form;

  _generateMarkup() {
    return `
      <section class="form__section">
        <div class="form__section__logo--lg">
          <img class="form__section__img" loading='lazy' src="${websiteImage}" alt="website logo">
        </div>
  
        <div class="login__form__cont form__container form__container--blur">
  
          <h2 class="form__container__heading login__heading">Reset your password</h2>
  
          <form class="login__form" >
            <div class="input__label">
              <input class="input__label__input"  type="email" id="email" name='email'/>
              <label class="input__label__label" for="email">Email</label>
            </div>
            
            ${this.messageMarkup()}
            
            <button class="btn btn-light-blue form__btn" type="submit">Reset Password</button>
          </form>
        </div>
      </section>`
  }

  init(resetUserPass) {
    this.setTitle('Reset Password || Slack')
    this._form = document.querySelector('form');
    this.resetUserPassword(resetUserPass);
    this.placeholderLabelToggle(this._form);
  }

  resetUserPassword(resetUserPass) {
    this._form.addEventListener('submit', async e => {
      try {
        e.preventDefault();
        const email = this._form.email.value;

        if (!email) return await this.renderMessage('Yea, reset password mail has been sent to johndoe@mail.com xD', 'success', 3000);

        await resetUserPass(email);
        await this.renderMessage('Password reset mail has been sent to your mail', 'success', 3000);
        await this.Delay(2000);
        updateURL('_', true);
      } catch (err) {
        throw err
      }
    })
  }
}

export default new resetPassword();