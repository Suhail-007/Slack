import minimalAccInfo from './views/minimalAccView.js'
import fundTransferView from './views/fundTransferView.js'
import statisticsView from './views/statisticsView.js';

import { lineChart } from './charts.js'
import { pieChart } from './charts.js'
import * as model from './model.js'

//generate Html
function generateHTML() {
  minimalAccInfo.renderMinimalAccInfo();
  fundTransferView.generateHTML();
  statisticsView.generateHTML();
}


//sidebar 
document.addEventListener('click', e => {
  const btn = e.target.closest('.nav_btn_container');

  const sideBar = document.querySelector('.navbar');

  //if user is not clicking inside of sidebar, close it
  if (!btn && !e.target.closest('.navbar')) sideBar.classList.remove('open');

  if (btn) sideBar.classList.add('open');
});


function i() {
  button.addEventListener('click', copyRefLink);
}


function init() {
  generateHTML();
  fundTransferView.addHandlerCopyRef(model.copyRefLink)
}

init()
