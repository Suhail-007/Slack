import View from '../View.js'
import Wallet from '../components/Wallet.js'

class FundAndReferralView extends View {
  _parentElem = document.querySelector('main');
  _copyButton;
  _btnsCont;

  _generateMarkup() {
    return `
    <section class="section__bottom">
      <div class="section__bottom-ref">
        <h2>REFER A FRIEND</h2>
        <div class="section__bottom-ref__img-cont">
          <img src="./src/images/refer.jpeg" alt="refer a friend">
        </div>

        <h4 class="section__bottom-ref__sub-head">Referral Link</h4>
        <a href="#" data-ref-link class="ref_link">https://github.com/Suhail-007/dashboard-ui</a>
        <button data-copy-btn class="copy_ref_link btn btn-purple flex-row-AI-center">
          <svg>
          <use href="./src/images/icons.svg#icon_copy"></use>
          </svg>
          <span>
            Copy Referral Link
          </span>
        </button>
      </div>
      ${Wallet.miniWallet(this._data.data.wallet)}
    </section>`;
  }

  init(updateUserData) {
    this.updateUserData = updateUserData;
    Wallet.addInputAmount(this._data.data, 'dashboard');
  }

  async updateAndRender(value) {
    const totalDepositElem = document.querySelector('[data-deposit-income]');

    await this.updateUserData({ 'wallet': value });
    totalDepositElem.innerHTML = '';
    totalDepositElem.innerHTML = `$ ${this._data.data.wallet}`;
  }

  _toastCopy() {
    const body = document.body;

    let html = `
      <div class="toast_copy">
        <p>Copied</p>
      </div>`

    body.insertAdjacentHTML('beforeend', html);
    this._hideToastCopy();
  }

  _hideToastCopy() {
    const toast = document.querySelector('.toast_copy');
    toast.style.opacity = 1;
    setTimeout(() => {
      toast.style.opacity = 0;
    }, 1000);
  }

  addHandlerCopyRef(handler) {
    this._copyButton = document.querySelector('[data-copy-btn]');
    this._btnsCont = document.querySelector('[data-investWallet-btns]');
    const refLink = document.querySelector('[data-ref-link]');
    this._copyButton.addEventListener('click', e => {
      const btn = e.target.closest('[data-copy-btn]');

      const btnSpanElem = btn.querySelector('span');

      if (!btn) return;
      handler(refLink);

      btnSpanElem.innerText = 'Copied';
      this._toastCopy();

      setTimeout(() => {
        btnSpanElem.innerText = 'Copy Referral Link';
      }, 1000);
    })
  }

  _toggleClass(parentElem, className) {
    parentElem.forEach(btn => {
      btn.classList.toggle(className);
    });
  }

  activeBtn() {
    const btns = document.querySelectorAll('[data-investWallet-btns] button');

    const fundActionBtns = document.querySelectorAll('[data-addWithdraw-btns] button');

    this._btnsCont.addEventListener('click', e => {
      if (e.target.closest('[data-investWallet-btns]') && !e.target.classList.contains('active')) {

        //add withdraw funds and add withdraw tabs
        this._toggleClass(Array.from(btns), 'active');

        this._toggleClass(Array.from(fundActionBtns), 'active');
      }
    })
  }
}

export default new FundAndReferralView()