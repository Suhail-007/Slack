const parentElem = document.querySelector('main');

export const loader = function() {
  const html = `
    <div class="loader-cont">
      <div class="loader">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M0 0h24v24H0z" fill="none"/><path d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z"/></g></svg>
      </div>
    </div>`
    
    parentElem.innerHTML = '';
    parentElem.insertAdjacentHTML('afterbegin', html);
}
