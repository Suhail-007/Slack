export const NAV_TOGGLE_BTN = function() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-navBtn-container]');

    const sideBar = document.querySelector('.navbar');

    if (!sideBar) return

    //if user is not clicking inside of sidebar, close it
    if (!btn && !e.target.closest('.navbar')) sideBar.classList.remove('open');

    if (btn) sideBar.classList.add('open');
  });
};

//set Local Storage
export const setLocalStorage = function(key, value) {
  localStorage.setItem(`${key}`, JSON.stringify(`${value}`));
}

export const updateURL = function(page, reset = false) {
  if (reset) {
    location.href = new URL('/', location.href);
    return
  };
  history.pushState('', '', `?page=${page}`);
}