import { updateURL, toggleModal, modalHandler } from '../../helper.js';
import { defaultUserPic } from '../../config.js';
import FORM from '../../components/Form.js';
import reAuthUser from '../../components/reAuthUser.js';

class EditProfileView extends FORM {
  _parentElem = document.querySelector('main');

  _generateMarkup() {
    return `
    <section class='section section__edit'>
    <h2 class='u-letter-spacing-sm u-margin-bottom-big section__edit__heading'>
      Edit Your Profile
    </h2>
      ${this.form('Done', `${this._setUserPic(this._data.data.extraInfo)}`, 'none', 'value=""', 'New Password')}
      
      ${reAuthUser.renderData(false)}
    </section>`
  }

  async init(data) {
    this.setTitle('Edit User Information || Slack')
    toggleModal('Leave the fields empty which you do not wish to update.!');

    this.updateData(data);
    this.previewUserProfile();
  }

  updateData(data) {
    const form = document.querySelector('form');
    form.addEventListener('submit', async e => {
      try {
        e.preventDefault();
        const { initHome, removeHeaderFooter, updateUserData, renderTab } = data;
        const fd = new FormData(form);
        const fdObj = Object.fromEntries(fd);

        //check if entered data is Valid
        const { fullname, isPassSame } = this.isInputsCorrect(fdObj);

        //disabled btn
        this.toggleBtnState();

        if (!fullname && fdObj.fullname !== '') throw Error('Please enter full name');
        if (!isPassSame && fdObj.password !== '') throw Error('Passwords do not match');

        toggleModal('Updating user data, don\'t leave the page or press back button.');

        const updatedData = this.updatedData(fdObj);

        await this.renderMessage('Updating user data', 'success', 500);

        //checks if password fields aren't empty
        if (fdObj.password) {
          const { updateUserPassword, loginUser } = data;
          toggleModal('Updating Password, don\'t leave the page or press back button.');

          await this.updatePassword(updateUserPassword, loginUser, fdObj.password);

          toggleModal('Password Updated.');
        }

        if (fdObj.profile.name !== '') {

          const { uploadPic } = data;

          toggleModal('Updating Profile Picture, don\'t leave the page or press back button.');

          await uploadPic(this._data.data.extraInfo, fdObj.profile);

          toggleModal('Profile Picture Updated.');
        }

        //update data after user passwprd is updated
        await updateUserData(updatedData);

        toggleModal('Data updated.!');

        await this.renderMessage('Data updated!', 'success', 1000);

        //reset form just in case
        form.reset();

        updateURL('profile');

        //remove & re render nav & footer
        removeHeaderFooter();
        await initHome(this._data);

//navigate back user to profile tab
        renderTab();
      } catch (err) {
        this.toggleBtnState(true);
        await this.renderMessage(err, 'error', 2000);
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

  async updatePassword(updateUserPassword, loginUser, password) {
    try {
      reAuthUser.showForm();
      const emailPass = await reAuthUser.getReAuthInfo();
      //hide form
      reAuthUser.hideForm();
      //if user cancel the process exit from fn
      if (!emailPass.reAuthEmail || !emailPass.reAuthPass) {
        await this.renderMessage('we can\'t create something from nothing, can we? :)', 'error', 2000);
        return false
      }

      const { reAuthEmail: email, reAuthPass: pass } = emailPass;

      //login user again
      const currUser = await loginUser(email, pass);

      await this.renderMessage('Updating your password', 'success', 1000);

      const isPassUpdated = await updateUserPassword(currUser, password);

      if (isPassUpdated) {
        await this.renderMessage('Password updated, you can now use your new password to login', 'success', 2000);
      }

    } catch (err) {
      throw err
    }
  }
}

export default new EditProfileView();