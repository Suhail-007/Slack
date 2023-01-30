import View from '../View.js';
import Wallet from '../components/Wallet.js';
import { investCard } from '../components/Cards.js'

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

  async init(getBitcoinDetails, updateUserData, getStockOpenPrice) {
    this.setTitle('Invest wallet || Slack');
    this.updateData = updateUserData;
    this.setBitcoinPrice(getBitcoinDetails);
    this.setStockPrice(getStockOpenPrice);
    this.addActiveClass();
    Wallet.addInputAmount(this._data.data);
  }

  setBitcoinPrice(getBitcoinDetails) {
    const res = await getBitcoinDetails();
    const price = document.querySelector('[data-price="bitcoin"]');
    this.#coin =  this.#coin.data.open;
    
    if(!this.#coin) return price.textContent = 'Closed';
    price.textContent = `$${this.#coin.data.open}`;
  }
  
  setStockPrice(getStockOpenPrice) {
    const res = await getStockOpenPrice()
    const price = document.querySelector('[data-price="SM"]');
   
   //Couldn't find stock market api 
    this.#openPrice = res;
    if (!this.#openPrice) return price.textContent = 'Closed';
    
    price.textContent = `$ ${this.#openPrice}`;
  }

  addActiveClass() {
    const details = document.querySelectorAll('[data-invest-details]');
    details.forEach(item => {
      item.classList.add('active');
    })
  }
}

export default new InvestWallet();