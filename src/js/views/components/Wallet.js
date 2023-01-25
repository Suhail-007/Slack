import View from '../View.js';
import investWallet from '../pages/investWallet.js';
import { updateUserData } from '../../firebase-app.js';
import fundAndReferralView from '../dashboard/fundAndReferralView.js';

class Wallet extends View {
  _btnsCont

  miniWallet(amount) {
    return `
      <div class="wallet">
        <div data-wallet-btns class="wallet__btns">
          <button class="btn-grey-animated active">Add Fund</button>
          <button class="btn-grey-animated">Withdrawal</button>
        </div>
        ${this.addFundInputMarkup(amount)}
      </div>`
  }

  addFundInputMarkup(amount) {
    return `
      <div class="wallet__input-cont">
        ${this.totalDepositMarkup(amount)}
      
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

  totalDepositMarkup(amount) {
    return `
      <div class="wallet__deposit-income">
        <p>Total Deposit Income</p>
        <p data-deposit-income>$ ${amount}</p>
      </div>`
  }

  async updateAndRender(value) {
    const totalDepositElem = document.querySelector('[data-deposit-income]');

    await updateUserData({ 'wallet': value });
    totalDepositElem.innerHTML = '';
    totalDepositElem.innerHTML = `$ ${value}`;
  }

  addInputAmount(user) {
    const form = document.querySelector('[data-addWithdraw-btns]');

    form.addEventListener('submit', async e => {
      e.preventDefault();
      try {

        const addBtn = e.target.querySelector('[data-cta="add"]');
        
        if (!addBtn) return

        if (isNaN(+form.walletInfo.value) || !form.walletInfo.value) return await this.renderMessage('Add number value', 'error', 3000);

        if (typeof user.wallet === 'string') user.wallet = +user.wallet;

        user.wallet += +form.walletInfo.value;

        await this.renderMessage('Adding Money to wallet', 'def', 3000);

        await this.updateAndRender(user.wallet);

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
}

export default new Wallet();