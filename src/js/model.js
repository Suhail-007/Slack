import  dashboardView from './views/dashboard/dashboardView.js'

export const copyRefLink = async function(element) {
  await navigator.clipboard.writeText(element.innerText);
}

export const NAV_TOGGLE_BTN = function() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.nav_btn_container');

    const sideBar = document.querySelector('.navbar');

    //if user is not clicking inside of sidebar, close it
    if (!btn && !e.target.closest('.navbar')) sideBar.classList.remove('open');
    
    if (btn) sideBar.classList.add('open');
  });
};


//create a switch which will check on which option user is clicking on side bar then call the appropiate view to generate the html

export const generateHTML = function() {
  /*  const elem = e.target
    switch (elem) {
      case 'Profile':
        // code
        break;
      default:*/
//  dashboardView.renderDashboardView();
  //  }
}
