class FundTransferView {
  _parentElement = document.querySelector('.container_ref_amnt');

  generateHTML() {
    let html = `
      <div class="referral_container">
        <div class="ref_img_cont">
          <p>IMAGE</p>
          <img src="" alt="">
        </div>

        <h4>Referral Link</h4>
        <a href="#" class="ref_link">Example.com</a>
        <button>
          <!-----ICON HERE----->
          <span class="copy_ref_link">
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
  }
}

export default new FundTransferView()