import View from './View.js';

class SignUpView extends View {
  _parentElem = document.querySelector('main');
  
  _generateMarkup() {
return 'Sigup Page'
    const html = `
    <section class="form">
      <div class="form__website-logo">
        <img src="/static/src/images/m_logo.jpg" alt="Slack (website logo)">
      </div>

      <div class="form__container">

        <h2 class="form__container__heading">Login to your account</h2>

        <form>
          <input type="email" id="email" />
          <label for="email">Email</label>

          <input pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$' title='Password should contain a number, a capital letter and a small letter' type="password" id="password">
          <label for="password">Password</label>

          <button type="submit">Log in</button>


          <p class="signup">Don't have account yet?<a href="#">Sign up</a></p>
        </form>
      </div>
    </section>`

    // this._parentElem.insertAdjacentHTML('beforeend', html);
  }

  logIn() {

  }
}

export default new SignUpView()