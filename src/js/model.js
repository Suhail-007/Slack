import dashboardView from './views/dashboard/dashboardView.js';
import fundTransferView from './views/dashboard/fundTransferView.js';
import profileView from './views/profileView.js'

export const copyRefLink = async function(element) {
  await navigator.clipboard.writeText(element.innerText);
}

export const renderTab = function(e) {
  const elem = e.target.closest('.nav_item');
  const dataset = elem?.dataset.nav.toLowerCase();
  const main = document.querySelector('main');
  main.innerHTML = '';

  switch (dataset) {
    case 'dashboard':
      dashboardView.renderDashboardMarkup();
      fundTransferView.addHandlerCopyRef(copyRefLink);
      fundTransferView.activeBtn();
      break;

    case 'profile':
      profileView.renderProfileView();
      break;
    default:
      return
  }
}
