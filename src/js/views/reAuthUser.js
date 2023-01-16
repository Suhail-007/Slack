class reAuthUser {
  reAuthFormElem;

  generateMarkup() {
    return `
      <div data-reAuthForm class='reAuth reAuth__cont'>
        <form class='reAuth__reAuthForm' data-reAuthPass>
          <h4 class='u-margin-bottom-small .u-letter-spacing-small reAuth__reAuthForm__heading'>Re Authenticate your account to proceed further!</h4>
          
          <div>
            <label for='reAuthEmail' class='reAuth__reAuthForm__Pass'>Email (Enter your account Email)</label>
            <input id='reAuthEmail' type='email' required name='reAuthEmail' class='input__label__input reAuth__reAuthForm__input reAuth__reAuthForm__email'>
            
            <label for='reAuthPass' class='reAuth__reAuthForm__Pass'>Password (Enter your account password)</label>
            <input id='reAuthPass' type='password' required name='reAuthPass' class='input__label__input reAuth__reAuthForm__input reAuth__reAuthForm__pass'>
          </div>
          
          <button class='btn btn-light-blue reAuth__reAuthForm__btn' type='submit'>Submit</button>
        </form>
      </div>`
  }

  getReAuthPass() {
    return new Promise(resolve => {
      const form = document.querySelector('[data-reAuthPass]');

      form.addEventListener('submit', e => {
        e.preventDefault();
        const fd = [...new FormData(form)];
        const fdObj = Object.fromEntries(fd);
        return resolve(fdObj);
      })
    })
  }

  showForm() {
    this._reAuthFormElem = document.querySelector('[data-reAuthForm]');
    this._reAuthFormElem.classList.add('active');
  }

  hideForm() {
    this._reAuthFormElem.classList.remove('active');
  }
}

export default new reAuthUser();