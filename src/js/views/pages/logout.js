import View from '../View.js'
import { updateURL } from '../../helper.js'

class logoutView extends View {
  async init(logoutUser, unSubAuth, unSubSnapShot) {
    this.setTitle('Logout');
    await logoutUser();
    await unSubAuth();
    await unSubSnapShot();

    document.write('Redirecting to login page');
    await this.Delay(1000);

    updateURL('_', true);
  }
}

export default new logoutView();