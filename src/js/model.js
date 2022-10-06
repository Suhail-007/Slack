import { dashboard } from './views/dashboard/dashboardView.js'

export const copyRefLink = async function(element) {
  await navigator.clipboard.writeText(element.innerText);
}

//create a switch which will check on which option user is clicking on side bar then call the appropiate view to generate the html

export const generateHTML = function() {
  /*  const elem = e.target
    switch (elem) {
      case 'Profile':
        // code
        break;
      default:*/
  dashboard.renderDashboardView();
  //  }
}
