import View from '../View.js';
import * as Wallet from '../components/Wallet.js';
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
      
      ${Wallet.addFundInput('$2000')}
    </section>
    `
  }

  async init(bitcoinDetails) {
    this.#coin = await bitcoinDetails();
    this.setCoinPrice();
    this.isPageLoad()
  }

  setCoinPrice() {
    const price = document.querySelector('[data-price]');
    price.textContent = `$${this.#coin.data.open}`;
  }
  
  isPageLoad() {
    const details = document.querySelectorAll('[data-invest-details]');
    
    details.forEach(item => {
      item.classList.add('active');
    })
  }
}

export default new InvestWallet();