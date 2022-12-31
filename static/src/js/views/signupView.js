import View from './View.js';

class SignUpView extends View {
  _parentElem = document.querySelector('main');

  _generateMarkup() {
    return `
    <section class="form__section">
      <div class="form__section__logo--lg">
        <img class="form__section__img" loading='lazy' src="/static/src/images/m_logo.jpg" alt="Slack (website logo)">
      </div>

      <div class="form__container form__container--blur">

        <h2 class="form__container__heading login__heading">Create Account</h2>

        <form class="signup__form">
          <label for="Fn">Full Name</label>
          <input class="input__label__input" id="Fn" required type="text" placeholder="Full name">

          <label for="email">Email</label>
          <input class="input__label__input" placeholder="Email" required class="" type="email" id="email" name='email' />

          <label for="password">Password</label>
          <input class="input__label__input" placeholder="Password@0" required pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$' title='Password should contain a number, a capital letter, a small letter and a symbol' type="text" id="password">

          <label for="re-password">Re-Password (re-type your password)</label>
          <input class="input__label__input" placeholder="Password@0" required pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$' title='Password should contain a number, a capital letter, a small letter and a symbol' type="text" id="re-password">

          <label for="dob">DOB</label>
          <input required id="dob" type="date" value="">

          <label for="state">State</label>
          <input class="input__label__input" placeholder="state you're currently living in" required id="state" type="text" value="">

          <label for="country">Country</label>
          <input class="input__label__input" placeholder="country you're currently living in" required id="country" type="text" value="">


          <section class="section__error">
            <p class="section__error__msg"></p>
          </section>

          <button class="form__btn signup-btn" type="submit">Sign up</button>

          <p class="signup--login">Already have a account?<a href="/">Log In</a></p>
        </form>
      </div>
    </section>`
  }

  logIn() {

  }
}

export default new SignUpView()