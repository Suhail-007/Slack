import View from '../View.js';
import Wallet from '../../components/Wallet.js';
// import icons from './src/assets/icons.svg';
import icons from '../../../assets/icons.svg';

class MinimalAccView extends View {
  _parentElem = document.querySelector('main');
  
  _generateMarkup() {
    return `
    <section class="account_info u-margin-bottom" data-minimal-acc-info>
      <div class="total_cont acc_div">
        <div>
          <svg>
            <use xlink:href="${icons}#icon_total-money"></use>
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
            <use href="${icons}#icon_wallet"></use>
          </svg>
        </div>     
        <div class="acc_total_cont">
          <p class="total acc_total">Wallet</p>
          <p class="total_amount acc_amount">$${Wallet.walletBalance(this._data.data)}</p>
        </div>
      </div>

      <div class="withdrawal_cont acc_div">
        <div>
        <svg>
          <use href="${icons}#icon_withdraw-wallet"></use>
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