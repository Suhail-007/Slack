import View from '../View.js'
import icons from '../../../assets/icons.svg';


class StatisticsView extends View {
  _parentElem = document.querySelector('main');

  _generateMarkup() {
    return `
    <section data-statistics-boxes class="statistics_boxes">
      <div class="box card--vertical box-1">
        <div class="icon_heading">
          <div>
          <svg>
            <use href="${icons}#icon_chart"></use>
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

      <div class="box card--vertical box-2">
        <div class="icon_heading">
          <div>
          <svg>
            <use href="${icons}#icon_money-bag"></use>
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

      <div class="box card--vertical box-3">
        <div class="icon_heading">
          <div>
          <svg>
            <use href="${icons}#icon_binary-income"></use>
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

      <div class="box card--vertical box-4">
        <div class="icon_heading">
          <div>
          <svg>
            <use href="${icons}#current_income"></use>
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