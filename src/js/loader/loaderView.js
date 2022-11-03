const parentElem = document.querySelector('main');

export const loader = function() {
  const html = `
    <section class="section-loader">
      <div class="section-loader-cont">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M0 0h24v24H0z" fill="none"/><path d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z"/></g></svg>
      </div>
    </section>`
    
    parentElem.innerHTML = '';
    parentElem.insertAdjacentHTML('afterbegin', html);
    
    return Promise.resolve('');
}
