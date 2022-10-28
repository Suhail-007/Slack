import lineConfig from '../../charts/lineChart.js';
import pieConfig from '../../charts/pieChart.js';

class ChartView {
  _parentElement = document.querySelector('main');
  _pieChart;
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
    this._pieChart = document.getElementById('roi');
    this._lineChart = document.getElementById('lines').getContext('2d');
    this._createChart();
  }

  _createChart() {
    const linechart = new Chart(this._lineChart, lineConfig);
    
     const pieChart = new Chart(this._pieChart, pieConfig);
  }
}

export default new ChartView();
