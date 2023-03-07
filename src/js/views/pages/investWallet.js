import View from '../View.js';
import Wallet from '../../components/Wallet.js';
import { investCard } from '../../components/Cards.js'
import icons from '../../../assets/icons.svg'

class InvestWallet extends View {
  #coin;
  #openPrice
  _parentElem = document.querySelector('main');

  _generateMarkup() {
    return `
    <section class="invest-wallet section">

      <h3 class="heading heading__h3 u-margin-bottom-big">Invest wallet</h3>

      <div class="invest-wallet__details flex-col">
        <div data-invest-details class="u-LineBar flex-row-AI-cntr-Jsb">
          <p>Total Invested Amount</p>
          <p>$0</p>
        </div>
        <div data-invest-details class="u-LineBar flex-row-AI-cntr-Jsb">
          <p>Wallet</p>
          <p>$${Wallet.walletBalance(this._data.data)}</p>
        </div>
      </div>
      <div class="invest-wallet__cards-cont flex-col">
        ${investCard({price: 0, icon:`${icons}#icon-bitcoin`, heading: 'bitcoin', className:'bitcoin'})}
        ${investCard({price: 0, icon:`${icons}#icon-SM`, heading: 'stock market', className: 'SM'})}
      </div> 
      
      <div data-wallet>
        ${Wallet.addFundInputMarkup(this._data.data)}
      </div>
    </section>
    `
  }

  async init(getBitcoinDetails, getStockOpenPrice) {
    this.setTitle('Invest wallet || Slack');
    await this.setBitcoinPrice(getBitcoinDetails);
    await this.setStockPrice(getStockOpenPrice);
    this.addActiveClass();
    Wallet.addInputAmount(this._data.data);
  }

  async setBitcoinPrice(getBitcoinDetails) {
    try {
      const res = await getBitcoinDetails();
      const price = document.querySelector('[data-price="bitcoin"]');

      this.#coin = res;

      if (!this.#coin) return price.textContent = 'Closed';
      price.textContent = `$${this.#coin.open}`;
    } catch (err) {
      throw err
    }
  }

  async setStockPrice(getStockOpenPrice) {
    try {
      const res = await getStockOpenPrice()
      const price = document.querySelector('[data-price="SM"]');

      //Couldn't find stock market api 
      this.#openPrice = res;

      if (!this.#openPrice) return price.textContent = 'Closed';

      price.textContent = `$ ${this.#openPrice}`;
    } catch (err) {
      throw err
    }
  }

  addActiveClass() {
    const details = document.querySelectorAll('[data-invest-details]');
    details.forEach(item => {
      item.classList.add('active');
    })
  }
}

export default new InvestWallet();