import minimalAccInfo from './views/minimalAccView.js'
import fundTransferView from './views/fundTransferView.js'
import statisticsView from './views/statisticsView.js';

//import { lineChart } from './charts.js'
//import { pieChart } from './charts.js'
import * as model from './model.js'
import { NAV_TOGGLE_BTN } from './helper.js'

//generate Html
const generateHTML = function() {
  minimalAccInfo.renderMinimalAccInfo();
  fundTransferView.generateHTML();
  statisticsView.generateHTML();
}

function init() {
  generateHTML();
  fundTransferView.addHandlerCopyRef(model.copyRefLink);
  fundTransferView.activeBtn();
  NAV_TOGGLE_BTN();
}

init();
