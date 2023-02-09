import View from '../View.js'
import { updateURL, toggleModal, modalHandler } from '../../helper.js';
import { defaultUserPic } from '../../config.js';
import FORM from '../components/Form.js';
import reAuthUser from '../components/reAuthUser.js';

class EditProfileView extends View {
  _parentElem = document.querySelector('main');

  _generateMarkup() {
    return `
    <section class='section section__edit'>
    <h2 class='u-letter-spacing-sm u-margin-bottom-big section__edit__heading'>
      Edit Your Profile
    </h2>
      ${FORM.render('Done', `${this._setUserPic(this._data.data.extraInfo)}`, 'none', 'value=""', 'New Password')}
      
      ${reAuthUser.renderData(false)}
    </section>`
  }

  async init(updateUserData, renderTab, updateUserPassword, uploadPic, initHome, homeView, loginUser) {
    this.setTitle('Edit User Information || Slack')
    // toggleModal('Leave the fields empty which you do not wish to update.!');

    this.updateData(updateUserData, renderTab, updateUserPassword, uploadPic, initHome, homeView, loginUser);
    this.previewUserProfile();
  }

  updateData(updateUserData, renderTab, updateUserPassword, uploadPic, initHome, homeView, loginUser) {
    const form = document.querySelector('form');
    form.addEventListener('submit', async e => {
      try {
        e.preventDefault();
        const fd = new FormData(form);
        const fdObj = Object.fromEntries(fd);

        //check if entered data is Valid
        const { fullname, isPassSame } = this.isInputsCorrect(fdObj);

        if (fullname !== '' && !fullname) throw Error('Please enter full name');
        if (!isPassSame) throw Error('Passwords do not match');

        await this.renderMessage('Updating user data', 'success', 2000);

        const updatedData = this.updatedData(fdObj);

        //checks if password fields aren't empty
        if (fdObj.password) await this.updatePassword(updateUserPassword, loginUser, fdObj.password);

        const profilePicName = updatedData.extraInfo.profilePicName;
        
        if (!(profilePicName !== this._data.data.extraInfo.profilePicName)) {
        await uploadPic(this._data.data.extraInfo, fdObj.profile);
        }

        //update data after user passwprd is updated
        await updateUserData(updatedData);

        //remove & re render nav & footer
        homeView.removeHeaderFooter();
        initHome();

        await this.renderMessage('Data updated!', 'success', 2000);

        // updateURL('profile');
        // renderTab();
      } catch (err) {
        console.log(err);
        await this.renderMessage(err, 'error', 3000);
      }
    })
  }

  updatedData(user) {
    //restructure the obj, at this point userData have empty string value 
    const userData = this.reStructureObj(user);
    const data = { ...this._data.data };

    for (let key in userData) {

      if (typeof userData[key] === 'object' && !Array.isArray(key)) {

        const nObj = userData[key];

        //i.e data[personalInfo][fullname]
        for (let nKeys in nObj)
          if (nObj[nKeys] !== '') data[key][nKeys] = nObj[nKeys];
      }
    }

    return data
  }

  reStructureObj(obj) {
    return {
      personalInfo: {
        fullname: obj.fullname,
        email: obj.email,
        contact: obj.countryCode + obj.phone,
        dob: obj.dob,
        state: obj.state,
        country: obj.country,
        gender: obj.gender,
      },
      extraInfo: {
        profilePicName: obj.profile.name,
        profilePic: '',
        bio: ''
      },
    }
  }

  isInputsCorrect(fdObj) {
    let { fullname, password, Repassword: rePassword } = fdObj;

    //check if user enter fullname
    if (fullname !== '') fullname = fullname.includes(' ');

    //check if passwords is same
    password = password.split('');
    rePassword = rePassword.split('');
    const isPassSame = password.every((l, i) => rePassword[i] === l);
    return { fullname, isPassSame }
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

  async updatePassword(updateUserPassword, loginUser, password) {
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
      const currUser = await loginUser(email, pass);

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
}

export default new EditProfileView();