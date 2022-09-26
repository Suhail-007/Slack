import minimalAccInfo from './views/minimalAccView.js'
import fundTransferView from './views/fundTransferView.js' 
import { lineChart } from './charts.js'
import { pieChart } from './charts.js'
import { copyRefLink } from './model.js'

//sidebar 
document.addEventListener('click', e => {
  const btn = e.target.closest('.nav_btn_container');

  const sideBar = document.querySelector('.navbar');

  //if user is not clicking inside of sidebar, close it
  if (!btn && !e.target.closest('.navbar')) sideBar.classList.remove('open');

  if (btn) sideBar.classList.add('open');
});



const button = document.querySelector('.copy_ref_link');

function i() {
  button.addEventListener('click', copyRefLink);
}


function init() {
  minimalAccInfo.renderMinimalAccInfo();
  fundTransferView.generateHTML();
}

init()
