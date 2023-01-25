import View from '../View.js';
import Wallet from '../components/Wallet.js';
import { investCard } from '../components/Cards.js'

class InvestWallet extends View {
  #coin;
  _parentElem = document.querySelector('main');

  _generateMarkup() {
    return `
    <section class="invest-wallet section">

      <h3 class="heading heading__h3 u-margin-bottom-big">Invest wallet</h3>

      <div class="invest-wallet__details flex-col">
        <div data-invest-details class="u-LineBar flex-row-AI-cntr-Jsb">
          <p>Total Invested Amount</p>
          <p>$1000</p>
        </div>
        <div data-invest-details class="u-LineBar flex-row-AI-cntr-Jsb">
          <p>Wallet</p>
          <p>$1000</p>
        </div>
      </div>
      <div class="invest-wallet__cards-cont flex-col">
        ${investCard({price: 0, iconName:'bitcoin', heading: 'Bitcoin'})}
        ${investCard({price: 0, iconName:'SM', heading: 'Stock Market'})}
      </div> 
      
      <div data-wallet>
        ${Wallet.addFundInputMarkup(this._data.data.wallet)}
      </div>
    </section>
    `
  }

  async init(bitcoinDetails, updateUserData) {
    this.setTitle('Invest wallet || Slack');
    this.#coin = await bitcoinDetails();
    this.updateData = updateUserData;
    this.setCoinPrice();
    this.addActiveClass();
    Wallet.addInputAmount(this._data.data, 'investWallet');
  }

  async updateAndRender(value) {
    const totalDepositElem = document.querySelector('[data-deposit-income]');

    await this.updateData({ 'wallet': value });
    totalDepositElem.innerHTML = '';
    totalDepositElem.innerHTML = `$ ${this._data.data.wallet}`;
  }

  setCoinPrice() {
    const price = document.querySelector('[data-price]');
    price.textContent = `$${this.#coin.data.open}`;
  }

  addActiveClass() {
    const details = document.querySelectorAll('[data-invest-details]');
    details.forEach(item => {
      item.classList.add('active');
    })
  }
}

export default new InvestWallet();