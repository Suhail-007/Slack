import * as model from './model.js';
import fundTransferView from './views/dashboard/fundTransferView.js';
import { NAV_TOGGLE_BTN } from './helper.js';



function init() {
  model.generateHTML();
  fundTransferView.addHandlerCopyRef(model.copyRefLink);
  fundTransferView.activeBtn();
  NAV_TOGGLE_BTN();
}

init();
