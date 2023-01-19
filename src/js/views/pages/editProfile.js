import View from '../View.js'
import { updateURL } from '../../helper.js';
import FORM from '../Form.js';

class EditProfileView extends View {
  _parentElem = document.querySelector('main');

  _generateMarkup() {
    return `
    <section class='section section__edit'>
    <h2 class='u-letter-spacing-small u-margin-bottom-big section__edit__heading'>
      Edit Your Profile
    </h2>
      ${FORM('Done', this._data.data.profilePic, 'none', 'value=""')}
    </section>`
  }

  async init(updateUserData, renderTab, uploadPic) {
    this.previewUserProfile();
    // await this.Delay(1000)
    // await this.renderMessage('Leave the fields empty which you do not wish to update.', 'def', 4000);
    this.getEditDetails(updateUserData, renderTab, uploadPic);
  }

  getEditDetails(updateUserData, renderTab, uploadPic) {
    const form = document.querySelector('form');
    form.addEventListener('submit', async e => {
      try {
        e.preventDefault();
        const fd = new FormData(form);
        const fdObj = Object.fromEntries(fd);
        const isSame = this.#isPasswordsSame(fdObj);
        const isInputsCorrect = this.isInputsCorrect(fdObj);

        if (!isSame) throw Error('Passwords do not match');
        if (!isInputsCorrect) throw Error('Please enter full name');

        await this.renderMessage('Updating user data', 'success', 2000);

        const { filteredData, profilePic } = this.filteredUserData(fdObj);

        await updateUserData(filteredData);
        await uploadPic(this._data.data.uid, profilePic);

        await this.renderMessage('Data updated!', 'success', 2000);

        updateURL('profile');
        renderTab();
      } catch (err) {
        await this.renderMessage(err, 'error', 3000);
      }
    })
  }

  filteredUserData(user) {
    let filteredData = {};
    let profilePic = {};
    for (let key in user) {
      if (user[key] !== '') {

        if (key === 'profile' && !user[key].name) continue

        if (key === 'profile' && user[key].name) {
          filteredData.profilePicName = user[key].name;
          profilePic = user[key];
          continue
        }

        filteredData[key] = user[key];
      }
    }
    return {
      filteredData,
      profilePic
    };
  }

  isInputsCorrect(fdObj) {
    let { fullname } = fdObj;
    if (!fullname) return true
    fullname = fullname.includes(' ');
    return fullname
  }

  #isPasswordsSame(fdObj) {
    let { password, Repassword: rePassword } = fdObj;
    password = password.split('');
    rePassword = rePassword.split('');
    const isSame = password.every((l, i) => rePassword[i] === l);
    return isSame
  }

  previewUserProfile() {
    const inputImgElem = document.querySelector('#profile');

    inputImgElem.addEventListener('change', () => {
      const img = document.querySelector('[data-img-preview]');
      const file = inputImgElem.files[0];

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener('load', () => img.src = fileReader.result);
    })
  }
}

export default new EditProfileView();