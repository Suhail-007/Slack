import View from '../View.js'
import Wallet from '../components/Wallet.js'

class FundAndReferralView extends View {
  _parentElem = document.querySelector('main');
  _copyButton;

  _generateMarkup() {
    return `
    <section class="section__bottom">
      <div class="section__bottom-ref">
        <h2>REFER A FRIEND</h2>
        <div class="section__bottom-ref__img-cont">
          <img src="./src/images/m_refer.jpeg" alt="refer a friend">
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
      ${Wallet.miniWallet(this._data.data)}
    </section>`;
  }

  init(updateUserData, handler) {
    this.updateUserData = updateUserData;
    Wallet.addInputAmount(this._data.data);
    this.addHandlerCopyRef(handler);
    Wallet.toggleFundBtns();
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
}

export default new FundAndReferralView()