class FundTransferView {
  _parentElement = document.querySelector('.container_ref_amnt');
  _copyButton;
  _btnsCont;

  generateHTML() {
    let html = `
      <div class="referral_container">
        <div class="ref_img_cont">
          <p>REFER A FRIEND</p>
          <img src="/src/images/refer.jpeg" alt="refer a friend">
        </div>

        <h4>Referral Link</h4>
        <a href="#" class="ref_link">https://github.com/Suhail-007/dashboard-ui</a>
        <button  class="copy_ref_link">
          <!-----ICON HERE----->
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
            <button data-add-fund>Add Fund</button>
            <button data-withdraw-fund class="hidden">Withdraw Fund</button>
          </div>
        </div>
      </div>`;

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

      if (!btn) return;
      handler(ref_link);

      this._copyButton.innerText = 'Copied';
      this._toastCopy();

      setTimeout(() => {
        this._copyButton.innerText = 'Copy Referral Link';
      }, 1000);
    })
  }

  _toggleBtnClass(parentElem, className) {
    parentElem.forEach(btn => {
      btn.classList.toggle(className);
    });
  }

  activeBtn() {
    const btns = document.querySelectorAll('.btns_container button');

    const fundActionBtns = document.querySelectorAll('.input_cont button');

    this._btnsCont.addEventListener('click', e => {
      if (e.target.closest('.btns_container')) {
        this._toggleBtnClass(Array.from(btns), 'active');

        this._toggleBtnClass(Array.from(fundActionBtns), 'hidden');
      }
    })
  }
}

export default new FundTransferView()
