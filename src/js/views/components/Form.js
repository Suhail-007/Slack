import { updateURL } from '../../helper.js';
import { defaultUserPic as formPic } from '../../config.js';

class FORM {
   render(buttonText, formPic, showLoginBtn, required, passwordText) {
    return `
      <form class="signup__form">
      
        <div class="signup__form__profile">
          <div class="signup__form__profile__fake">
            <img class='dp' data-img-preview loading='lazy' src="${formPic}"/>
          </div>
          <label for="profile">Choose a profile pic</label>
          <input accept="image/png image/jpg image/jpeg" id="profile" type="file" name="profile">
        </div>
      
        <label for="Fn">Full Name</label>
        <input class="input__label__input" id="Fn" ${required} type="text" name="fullname" placeholder="Full name">
  
        <label style='display:${showLoginBtn}' for="email">Email</label>
        <input style='display:${showLoginBtn}' class="input__label__input" placeholder="Email" ${required} type="email" id="email" name='email' />
  
        <label for="password">${passwordText}</label>
        <input class="input__label__input" placeholder="Password@0" ${required} pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$' title='Password should contain a number, a capital letter, a small letter and a symbol' type="text" name="password" id="password">
  
        <label for="Repassword">re-Type ${passwordText} (re-type your password)</label>
        <input class="input__label__input" placeholder="Password@0" ${required} pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$' title='Password should contain a number, a capital letter, a small letter and a symbol' type="text" name="Repassword" id="Repassword">
        
        <label for="phone">Phone Number</label>
        <div class="signup__form__phone-input">
          <input type='tel' size='3' maxlength='3' name='countryCode' placeholder='+91'>
          <input ${required} class="input__label__input" placeholder="99999-99999" type="tel" pattern="[0-9]{5}-[0-9]{5}" size='11' maxlength='11' id="phone" name='phone' />
        </div>
        
        <label for="gender">Gender</label>
        <input class="input__label__input" placeholder="Male/Female/Others" ${required} id="gender" name="gender" type="text">
  
        <label for="dob">DOB</label>
        <input name="dob" ${required} id="dob" type="date">
  
        <label for="state">State</label>
        <input class="input__label__input" placeholder="state you're currently living in" ${required} id="state"name="state" type="text">
  
        <label for="country">Country</label>
        <input class="input__label__input" placeholder="country you're currently living in" ${required} id="country" type="text" name="country">
  
  
        <div class="section__error">
          <p class="section__error__msg"></p>
        </div>
  
        <button class="btn btn-light-blue form__btn" type="submit">${buttonText}</button>
  
        <p style='display:${showLoginBtn}' class="signup--login">Already have a account?<a href="/" data-link>Log In</a></p>
      </form>`
  }

   redirectTo(toWhere, home) {
    const formLink = document.querySelector('[data-link]');
    formLink.addEventListener('click', e => {
      e.preventDefault();
      updateURL(toWhere, home);
    })
  }
}

export default new FORM();