import View from '../View.js'
import { updateURL } from '../../helper.js'

class logoutView extends View {
  async init(logoutUser) {
    this.setTitle('Logout');
    await logoutUser();

    document.write('Redirecting to login page');
    await this.Delay(1000);

    sessionStorage.removeItem('isLogin');
    updateURL('_', true);
  }
}

export default new logoutView();