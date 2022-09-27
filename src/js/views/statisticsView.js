class StatisticsView {
  _parentElement = document.querySelector('[data-statistics-boxes]');

  generateHTML() {
    let html = `
      <div class="box box-1">
        <div class="icon_heading">
          <!------ICON HERE--->

          <p>Roi Income</p>
        </div>

        <div class="dollar_percentage">
          <p class="dollar">$840.2</p>
          <span class="sub_info">
            +$29.1k
          </span>
        </div>
      </div>


      <div class="box box-2">
        <div class="icon_heading">
          <!------ICON HERE--->

          <p>Roi Income</p>
        </div>

        <div class="dollar_percentage">
          <p class="dollar">$840.2</p>
          <span class="percentage">
            +$29.1k
          </span>
        </div>
      </div>


      <div class="box box-3">
        <div class="icon_heading">
          <!------ICON HERE--->

          <p>Roi Income</p>
        </div>

        <div class="dollar_percentage">
          <p class="dollar">$840.2</p>
          <span class="sub_info">
            +$29.1k
          </span>
        </div>
      </div>


      <div class="box box-4">
        <div class="icon_heading">
          <!------ICON HERE--->

          <p>Roi Income</p>
        </div>

        <div class="dollar_percentage">
          <p class="dollar">$840.2</p>
          <span class="percentage">
            +$29.1k
          </span>
        </div>
      </div>`

    this._parentElement.insertAdjacentHTML('beforeend', html);
  }
}

export default new StatisticsView();
