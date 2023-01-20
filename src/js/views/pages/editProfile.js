import View from '../View.js'
import { updateURL } from '../../helper.js';
import { defaultUserPic } from '../../config.js';
import FORM from '../components/Form.js';
import reAuthUser from '../components/reAuthUser.js';

class EditProfileView extends View {
  _parentElem = document.querySelector('main');

  _generateMarkup() {
    return `
    <section class='section section__edit'>
    <h2 class='u-letter-spacing-small u-margin-bottom-big section__edit__heading'>
      Edit Your Profile
    </h2>
      ${FORM('Done', this.#setUserPic(this._data.data), 'none', 'value=""', 'New Password')}
      
      ${reAuthUser.renderData(false)}
    </section>`
  }

  async init(updateUserData, renderTab, updateUserPassword, uploadPic, initHome, homeView, loginUser) {
    this.setTitle('Edit User Information || Slack')
    await this.renderMessage('Leave the fields empty which you do not wish to update.', 'def', 4000);
    this.getEditDetails(updateUserData, renderTab, updateUserPassword, uploadPic, initHome, homeView, loginUser);
    this.previewUserProfile();
  }

  getEditDetails(updateUserData, renderTab, updateUserPassword, uploadPic, initHome, homeView, loginUser) {
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

        if (profilePic.name) await uploadPic(this._data.data.uid, profilePic);

        //checks if password fields aren't empty
        if (filteredData.password) {
          const isUpdated = await this.updatePassword(loginUser, filteredData.password, updateUserPassword);
          if (!isUpdated) return
        }

        //remove & re render nav & footer
        homeView.removeHeaderFooter();
        initHome();

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

  async updatePassword(loginUser, password, updateUserPassword) {
    try {
      reAuthUser.showForm();
      const emailPass = await reAuthUser.getReAuthInfo();
      //hide form
      reAuthUser.hideForm();
      //if user cancel the process exit from fn
      if (!emailPass.reAuthEmail || !emailPass.reAuthPass) {
        await this.renderMessage('we can\'t create something from nothing, can we? :)', 'error', 3000);
        return false
      }

      const { reAuthEmail: email, reAuthPass: pass } = emailPass;

      //login user again

      await this.renderMessage('Updating your password', 'success', 1500);

      const isPassUpdated = await updateUserPassword(currUser, password);

      if (isPassUpdated) {
        await this.renderMessage('Password updated, you can now use your new password to login', 'success', 2000);
        return true
      }

    } catch (err) {
      throw err
    }
  }

  #setUserPic(user) {
    return user.profilePic ? user.profilePic : defaultUserPic;
  }
}

export default new EditProfileView();