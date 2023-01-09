import View from '../View.js'

class MinimalAccView extends View {
  _parentElem = document.querySelector('main');
  
  _generateMarkup() {
    return `
    <section class="account_info" data-minimal-acc-info>
      <div class="total_cont acc_div">
        <div>
          <svg>
            <use xlink:href="./src/images/icons.svg#icon_total-money"></use>
          </svg>
        </div>
        <div>
          <p class="total acc_total">Total</p>
          <p class="total_amount acc_amount">$2000</p>
        </div>
      </div>

      <div class="wallet_cont acc_div">
        <div>
          <svg>
            <use href="./src/images/icons.svg#icon-wallet"></use>
          </svg>
        </div>     
        <div class="acc_total_cont">
          <p class="total acc_total">Wallet</p>
          <p class="total_amount acc_amount">$2000</p>
        </div>
      </div>

      <div class="withdrawal_cont acc_div">
        <div>
        <svg>
          <use href="./src/images/icons.svg#icon_withdraw-wallet"></use>
        </svg>
        </div>
        <div class="acc_total_cont">
          <p class="total acc_total">Withdrawal balance</p>
          <p class="total_amount acc_amount">$2000</p>
        </div>
      </div>
    </section>`
  }
}

export default new MinimalAccView()