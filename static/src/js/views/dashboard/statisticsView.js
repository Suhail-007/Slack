import View from '../View.js'

class StatisticsView extends View {
  _parentElem = document.querySelector('main');

  _generateMarkup() {
    return `
    <section data-statistics-boxes class="statistics_boxes">
      <div class="box box-1">
        <div class="icon_heading">
          <div>
          <svg>
            <use href="./static/src/images/icons.svg#icon_chart"></use>
          </svg>
          </div>
          <p>Roi Income</p>
        </div>

        <div class="dollar-percentage">
          <p class="dollar">$865.2</p>
          <span class="percentage">
            +20.9k
          </span>
        </div>
      </div>

      <div class="box box-2">
        <div class="icon_heading">
          <div>
          <svg>
            <use href="./static/src/images/icons.svg#icon_money-bag"></use>
          </svg>
          </div>

          <p>Direct Income</p>
        </div>

        <div class="dollar-percentage">
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
            <use href="./static/src/images/icons.svg#icon_binary-income"></use>
          </svg>
          </div>

          <p>Binary Income</p>
        </div>

        <div class="dollar-percentage">
          <p class="dollar">$750.00</p>
          <span class="percentage">
            +$2.8k
          </span>
        </div>
      </div>

      <div class="box box-4">
        <div class="icon_heading">
          <div>
          <svg>
            <use href=./static/src/images/icons.svg#current_income></use>
          </svg>
          </div>

          <p>Current Income</p>
        </div>

        <div class="dollar-percentage">
          <p class="dollar">$500.2</p>
          <span class="percentage">
            +$2.95%
          </span>
        </div>
      </div>
    </section>`
  }
}

export default new StatisticsView();