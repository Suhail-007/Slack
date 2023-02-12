import View from '../View.js';
import investWallet from '../pages/investWallet.js';
import { updateUserData } from '../../firebase-app.js';
import { toggleModal } from '../../helper.js';
import fundAndReferralView from '../dashboard/fundAndReferralView.js';

class Wallet extends View {
  _btnsCont

  miniWallet(data) {
    return `
      <div class="wallet">
        <div data-wallet-btns class="wallet__btns">
          <button class="btn-grey-animated active">Add Fund</button>
          <button class="btn-grey-animated">Withdrawal</button>
        </div>
        ${this.addFundInputMarkup(data)}
      </div>`
  }

  addFundInputMarkup(data) {
    return `
      <div class="wallet__input-cont">
        ${this.totalDepositMarkup(data)}
      
        <form data-addWithdraw-btns class="wallet__input-cont__input-btns">
          <label for="amount">Enter amount (in USD)</label>
          
          <input name='walletInfo' id="amount" type="text">
          
          <div class="message-cont">
            <p class="message"></p>
          </div>
          
          <button type='submit' class="btn btn-light-blue" data-cta='add'>Add Fund</button>
        </form>
      </div>`
  }

  totalDepositMarkup(data) {
    return `
      <div class="wallet__deposit-income">
        <p>Total Deposit Income</p>
        <p data-deposit-income>$${this.walletBalance(data)}</p>
      </div>`
  }

  addInputAmount(user) {
    const form = document.querySelector('[data-addWithdraw-btns]');
    const walletBalanceElem = document.querySelectorAll('[data-wallet-balance]');

    form.addEventListener('submit', async e => {
      e.preventDefault();
      try {
        const addBtn = e.target.querySelector('[data-cta="add"]');
        let { wallet } = user.accountInfo

        if (!addBtn) return

        if (isNaN(+form.walletInfo.value) || !form.walletInfo.value) return await this.renderMessage('Add number value', 'error', 3000);

        if (typeof wallet === 'string') wallet = +wallet;

        wallet += +form.walletInfo.value;

        await toggleModal(`Important! Do not leave the page. Adding Money to wallet.`);

        await updateUserData({ 'accountInfo.wallet': wallet });

        //update wallet balance in all places
        walletBalanceElem.forEach(elem => elem.textContent = wallet);
        await toggleModal(`Added money to wallet.`);

        form.reset();
      } catch (err) {
        throw err
      }
    })
  }

  _toggleClass(parentElem, className) {
    parentElem.forEach(btn => {
      btn.classList.toggle(className);
    });
  }

  toggleFundBtns() {
    this._btnsCont = document.querySelector('[data-wallet-btns]');
    const addFundBtn = document.querySelector('[data-cta]');
    const fundActionBtns = document.querySelectorAll('[data-wallet-btns] button');

    this._btnsCont.addEventListener('click', e => {

      if (e.target.closest('[data-wallet-btns]') && !e.target.classList.contains('active')) {

        //add withdraw funds and add withdraw tabs
        this._toggleClass(Array.from(fundActionBtns), 'active');

        if (addFundBtn.textContent.toLowerCase() === 'add fund') {
          addFundBtn.textContent = 'Withdraw Fund';
          addFundBtn.setAttribute('data-cta', 'withdraw');
          return
        }

        if (addFundBtn.textContent.toLowerCase() === 'withdraw fund') {
          addFundBtn.textContent = 'Add Fund';
          addFundBtn.setAttribute('data-cta', 'add');
          return
        }
      }
    })
  }


  walletBalance(data) {
    const { wallet } = data.accountInfo;
    return `<span data-wallet-balance>${wallet}</span>`
  }
}

export default new Wallet();