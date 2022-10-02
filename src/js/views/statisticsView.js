class StatisticsView {
  _parentElement = document.querySelector('[data-statistics-boxes]');

  generateHTML() {
    let html = `
      <div class="box box-1">
        <div class="icon_heading">
          <div>
          <svg>
            <use href="src/images/icons.svg#bar"></use>
          </svg>
          </div>
          <p>Roi Income</p>
        </div>

        <div class="dollar_percentage">
          <p class="dollar">$865.2</p>
          <span class="sub_info">
            +20.9k
          </span>
        </div>
      </div>


      <div class="box box-2">
        <div class="icon_heading">
          <div>
          <svg>
            <use href="src/images/icons.svg#money_bag"></use>
          </svg>
          </div>

          <p>Direct Income</p>
        </div>

        <div class="dollar_percentage">
          <p class="dollar">$500</p>
          <span class="percentage">
            -29 Trades
          </span>
        </div>
      </div>


      <div class="box box-3">
        <div class="icon_heading">
          <div>
          <svg>
            <use href="src/images/icons.svg#binary"></use>
          </svg>
          </div>

          <p>Binary Income</p>
        </div>

        <div class="dollar_percentage">
          <p class="dollar">$750.00</p>
          <span class="sub_info">
            +$2.8k
          </span>
        </div>
      </div>


      <div class="box box-4">
        <div class="icon_heading">
          <div>
          <svg>
            <use href=src/images/icons.svg#current_income></use>
          </svg>
          </div>

          <p>Current Income</p>
        </div>

        <div class="dollar_percentage">
          <p class="dollar">$500.2</p>
          <span class="percentage">
            +$2.95%
          </span>
        </div>
      </div>`

    this._parentElement.insertAdjacentHTML('beforeend', html);
  }
}

export default new StatisticsView();
