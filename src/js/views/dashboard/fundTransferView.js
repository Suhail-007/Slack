class FundTransferView {
  _parentElement = document.querySelector('main');
  _copyButton;
  _btnsCont;

  renderFundTransferView() {
    let html = `
    <section class="container_ref_amnt">
      <div class="referral_container">
        <div class="ref_img_cont">
          <h2>REFER A FRIEND</h2>
          <img src="./src/images/refer.jpeg" alt="refer a friend">
        </div>

        <h4>Referral Link</h4>
        <a href="#" class="ref_link">https://github.com/Suhail-007/dashboard-ui</a>
        <button  class="copy_ref_link">
          <svg>
          <use href="src/images/icons.svg#clipboard"></use>
          </svg>
          <span>
            Copy Referral Link
          </span>
        </button>
      </div>
      <div class="add_withdraw_container">
        <div class="btns_container">
          <button class="active">Add Fund</button>
          <button>Withdrawal</button>
        </div>
        <div class="deposit_income">
          <p>Total Deposit Income</p>
          <p>$1000</p>
        </div>

        <div class="input_cont">
          <label for="amount">Enter amount (in USD)</label>

          <div>
            <input id="amount" type="text">
            <button class="active" data-add-fund>Add Fund</button>
            <button data-withdraw-fund>Withdraw Fund</button>
          </div>
        </div>
      </div>
    </section>`;

    this._parentElement.insertAdjacentHTML('beforeend', html);
    this._copyButton = document.querySelector('.copy_ref_link');
    this._btnsCont = document.querySelector('.btns_container');
  }

  _toastCopy() {
    const body = document.body;

    let html = `
      <div class="toast_copy">
        <p>Copied</p>
      </div>`

    body.insertAdjacentHTML('beforeend', html);
    this._hideToastCopy();
  }

  _hideToastCopy() {
    const toast = document.querySelector('.toast_copy');
    toast.style.opacity = 1;
    setTimeout(() => {
     toast.style.opacity = 0;
    }, 1000);
  }

  addHandlerCopyRef(handler) {
    const ref_link = document.querySelector('.ref_link');

    this._copyButton.addEventListener('click', e => {
      const btn = e.target.closest('.copy_ref_link');

      const btnSpanElem = btn.querySelector('span');

      if (!btn) return;
      handler(ref_link);

      btnSpanElem.innerText = 'Copied';
      this._toastCopy();

      setTimeout(() => {
        btnSpanElem.innerText = 'Copy Referral Link';
      }, 1000);
    })
  }

  _toggleClass(parentElem, className) {
    parentElem.forEach(btn => {
      btn.classList.toggle(className);
    });
  }

  activeBtn() {
    const btns = document.querySelectorAll('.btns_container button');

    const fundActionBtns = document.querySelectorAll('.input_cont button');

    this._btnsCont.addEventListener('click', e => {
      if (e.target.closest('.btns_container')) {
        //add withdraw funds and add withdraw tabs
        this._toggleClass(Array.from(btns), 'active');

        this._toggleClass(Array.from(fundActionBtns), 'active');
      }
    })
  }
}

export default new FundTransferView()
