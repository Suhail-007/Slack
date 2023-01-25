import View from '../View.js';
import investWallet from '../pages/investWallet.js';
import fundAndReferralView from '../dashboard/fundAndReferralView.js';

class Wallet extends View {
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
          
          <button type='submit' class="btn btn-light-blue active" data-add-fund>Add Fund</button>
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

  addInputAmount(user, viewName) {
    const form = document.querySelector('[data-addWithdraw-btns]');
    
    form.addEventListener('submit', async e => {
      e.preventDefault();
      try {
        if (isNaN(+form.walletInfo.value) && !form.walletInfo.value) throw Error('Add number value');

        this.renderMessage('Adding Money to wallet', 'def', 3000);

        if (typeof user.wallet === 'string') user.wallet = +user.wallet;

        user.wallet += +form.walletInfo.value;
        
        if(viewName === 'investWallet') {
          await investWallet.updateAndRender(user.wallet);
          return
        }
        
        if(viewName === 'dashboard') {
          await fundAndReferralView.updateAndRender(user.wallet);
          return
        }
        
      } catch (err) {
        throw err
      }
    })
  }

}

export default new Wallet();