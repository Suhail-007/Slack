class reAuthUser {
  reAuthFormElem;

  renderData(render = true) {
    if (!render) return this._generateMarkup();
  }

  _generateMarkup() {
    return `
      <div data-reAuthForm class='reAuth reAuth__cont closeForm'>
        <form class='reAuth__reAuthForm' data-reAuthPass>
          <h4 class='u-margin-bottom-small .u-letter-spacing-small reAuth__reAuthForm__heading'>Re Authenticate your account to proceed further!</h4>
          
          <div>
            <label for='reAuthEmail' class='reAuth__reAuthForm__Pass'>Email (Enter your account Email)</label>
            <input id='reAuthEmail' type='email' required name='reAuthEmail' class='input__label__input reAuth__reAuthForm__input reAuth__reAuthForm__email'>
            
            <label for='reAuthPass' class='reAuth__reAuthForm__Pass'>Password (Enter your account password)</label>
            <input id='reAuthPass' type='password' required name='reAuthPass' class='input__label__input reAuth__reAuthForm__input reAuth__reAuthForm__pass'>
          </div>
          
          <button class='btn btn-light-blue reAuth__reAuthForm__btn submitBtn' type='submit'>Submit</button>
          <button class='btn btn-delete  cancel-btn' type='button'>Cancel</button>
        </form>
      </div>`
  }

  getReAuthInfo() {
    return new Promise((resolve, reject) => {
      const form = document.querySelector('[data-reAuthPass]');

      form.addEventListener('click', e => {
        e.preventDefault();

        if (e.target === 'input') return

        if (e.target.classList.contains('submitBtn')) {
          const fd = [...new FormData(form)];
          const fdObj = Object.fromEntries(fd);
          return resolve(fdObj);
        }

        if (e.target.classList.contains('cancel-btn')) {
          this.hideForm();
          return reject('Proccess canceled');
        }
      })
    }).catch(err => {
      throw Error(`${err}`);
    })
  }

  resetForm() {
    const form = document.querySelector('[data-reAuthPass]');
    form.reset();
  }

  showForm() {
    this._reAuthFormElem = document.querySelector('[data-reAuthForm]');
    this._reAuthFormElem.classList.add('active');
  }

  hideForm() {
    this._reAuthFormElem.classList.remove('active');
    this.resetForm();
  }
}

export default new reAuthUser();