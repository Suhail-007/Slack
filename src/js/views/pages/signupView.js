import websiteImage from '../../../assets/m_logo.jpg';
import FORM from '../../components/Form.js';
import { updateURL } from '../../helper.js'
import { defaultUserPic } from '../../config.js';

class SignUpView extends FORM {
  _parentElem = document.querySelector('main');

  _generateMarkup() {
    return `
    <section class="form__section">
      <div class="form__section__logo--lg">
        <img class="form__section__img" loading='lazy' src="${websiteImage}" alt="website logo">
      </div>

      <div class="form__container form__container--blur">

        <h2 class="form__container__heading login__heading">Create Account</h2>
        ${this.form('Sign up', defaultUserPic, 'block', 'required', 'Password')}
      </div>
    </section>`
  }

  init(createUserSendEmailVerif, createUserData) {
    this.setTitle('Sign up || Slack');
    this.getSignInDetails(createUserSendEmailVerif, createUserData);
    this.previewUserProfile();
    this.redirectTo('_', true);
  }

  getSignInDetails(createUserSendEmailVerif, createUserData) {
    const form = document.querySelector('form');
    form.addEventListener('submit', async e => {
      try {
        e.preventDefault();
        const fd = new FormData(form);
        const fdObj = Object.fromEntries(fd);
        const { fullname, isPassSame } = this.isInputsCorrect(fdObj);

        //disabled button
        this.toggleBtnState();

        if (!fullname) throw Error('Please enter full name');
        if (!isPassSame) throw Error('Passwords do not match');

        await this.renderMessage('Creating your account', 'success', 1500);

        const user = await createUserSendEmailVerif(fdObj.email, fdObj.password);

        if (user) await this.renderMessage('Account created. Check your mail inbox/spam tab to verify your account', 'success', 1000);

        //create user data in firebase database
        const userData = await createUserData(user, fdObj);

        if (userData) await this.renderMessage('User data created', 'success', 1500);

        updateURL('_', true);
      } catch (err) {
        this.toggleBtnState(true);
        await this.renderMessage(err, 'error', 3000);
      }
    })
  }
}

export default new SignUpView();