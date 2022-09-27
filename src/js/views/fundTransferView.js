class FundTransferView {
  _parentElement = document.querySelector('.container_ref_amnt');
  _copyButton;

  generateHTML() {
    let html = `
      <div class="referral_container">
        <div class="ref_img_cont">
          <p>IMAGE</p>
          <img src="" alt="">
        </div>

        <h4>Referral Link</h4>
        <a href="#" class="ref_link">Example.com</a>
        <button  class="copy_ref_link">
          <!-----ICON HERE----->
          <span>
            Copy Referral Link
          </span>
        </button>
      </div>
      <div class="add_withdraw_container">
        <div class="btns_container">
          <button class="addFund active">Add Fund</button>
          <button class="withdrawal">Withdrawal</button>
        </div>
        <div class="deposit_income">
          <p>Total Deposit Income</p>
          <p>$1000</p>
        </div>

        <div class="input_cont">
          <label for="amount">Enter amount (in USD)</label>

          <div>
            <input id="amount" type="text">
            <button>Add Fund</button>
          </div>
        </div>
      </div>`

    this._parentElement.insertAdjacentHTML('beforeend', html);
    this._copyButton = document.querySelector('.copy_ref_link');
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
  
  _hideToastCopy () {
    const toast = document.querySelector('.toast_copy');

    toast.style.opacity = 1;
    setTimeout(() => {
      toast.style.opacity = 0;
    }, 1000);
  }

  async addHandlerCopyRef(handler) {
    const ref_link = await document.querySelector('.ref_link');

    this._copyButton.addEventListener('click', e => {
      const btn = e.target.closest('.copy_ref_link');

      if (!btn) return;

      handler(ref_link);

      this._copyButton.innerText = 'Copied';
      this._toastCopy();

      setTimeout(() => {
        this._copyButton.innerText = 'Copy Referral Link';
      }, 1000)
    })
  }
}

export default new FundTransferView()