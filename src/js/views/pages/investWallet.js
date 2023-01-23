import View from '../View.js';
import * as Wallet from '../components/Wallet.js';
import { investCard } from '../components/Card.js'

class InvestWallet extends View {
  _parentElem = document.querySelector('main');
  
  _generateMarkup() {
    return `
    <section class="invest-wallet section">

      <h3 class="heading heading__h3 u-margin-bottom-big">Invest wallet</h3>


      <div class="invest-wallet__details flex-col">
        <div class="u-LineBar flex-row-AI-cntr-Jsb active">
          <p>Total Invested Amount</p>
          <p>$1000</p>
        </div>
        <div class="u-LineBar flex-row-AI-cntr-Jsb active">
          <p>Wallet</p>
          <p>$1000</p>
        </div>
      </div>
      ${investCard(1000, 'bitcoin', 'Bitcoin')}
      ${investCard(1000, 'SM', 'Stock Market')}
      
      ${Wallet.addFundInput('$1000')}
    </section>
    `
  }
}

export default new InvestWallet();