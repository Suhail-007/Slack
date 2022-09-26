class MinimalAccView {
  _parentElement = document.querySelector('[data-minimal-acc-info]');

  renderMinimalAccInfo() {
    let html = `
      <div class="total_cont acc_div">
        <div>
          <p class="total acc_total">Total</p>
          <p class="total_amount acc_amount">$2000</p>
        </div>

        <!----ICON HERE--->
      </div>

      <div class="wallet_cont acc_div">
        <div class="acc_total_cont">
          <p class="total acc_total">Wallet</p>
          <p class="total_amount acc_amount">$2000</p>
        </div>

        <!----ICON HERE--->
      </div>

      <div class="withdrawal_cont acc_div">
        <div class="acc_total_cont">
          <p class="total acc_total">Withdrawal balance</p>
          <p class="total_amount acc_amount">$2000</p>
        </div>

        <!----ICON HERE--->
      </div>`

    this._parentElement.insertAdjacentHTML('beforeend', html);
  }
}

export default new MinimalAccView()
