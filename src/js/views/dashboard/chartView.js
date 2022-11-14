import lineConfig from '../../charts/lineChart.js';
import pieConfig from '../../charts/doughnutChart.js';

import { chartTypes } from '../../helper.js'

class ChartView {
  _parentElement = document.querySelector('main');
  _doughnutChart;
  _lineChart;

  renderChart() {
    let html = `
      <section class="canvas"
        <div class="roi_income_chart_cont">
          <canvas id="roi"></canvas>
        </div>
        <div class="roi_income_chart_cont">
          <canvas width="300px" height="300px" id="lines"></canvas>
        </div>
      </section>`

    this._parentElement.insertAdjacentHTML('beforeend', html);
    this._doughnutChart = document.getElementById('roi');
    this._lineChart = document.getElementById('lines').getContext('2d');
    this.createChart();
  }

  createChart() {
    const lineChart = new Chart(this._lineChart, lineConfig);

    const doughnutChart = new Chart(this._doughnutChart, pieConfig);

    doughnutChart.config.type = chartTypes.typeOne;
    doughnutChart.update();
    lineChart.config.type = chartTypes.typeTwo;
    lineChart.update();
  }
}

export default new ChartView();

//pass an arguememt (editFlat) with default value set to false to createChart fn and import the chartView in model and and pass parameter set to true 
//only set parameter to true if only chart type exist in localstorage or dashboard access using sidebar