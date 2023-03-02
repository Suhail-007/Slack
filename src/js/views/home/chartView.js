import lineConfig from '../../charts/lineChart.js';
import doughnutConfig from '../../charts/doughnutChart.js';
import { Chart} from 'chart.js/auto';

//The most common is net income divided by the total cost of the investment, or ROI = Net income / Cost of investment x 100.

class ChartView {
  _parentElement = document.querySelector('main');
  _doughnutChartElem;
  _lineChartElem;

  renderChart() {
    return `
      <section class="canvas-cont">
        <div class="roi_income_chart_cont">
          <canvas width="300px" height="300px" id="roi"></canvas>
        </div>
        <div class="bi_income_chart_cont">
          <canvas width="300px" height="300px" id="bi"></canvas>
        </div>
      </section>`
  }

  createChart(userData) {
    this._doughnutChartElem = document.getElementById('roi');
    this._lineChartElem = document.getElementById('bi');

    const { charts } = userData.data.preference;
    const doughnutChartConfig = doughnutConfig(charts.roi);
    const lineChartConfig = lineConfig(charts.bi);

    const doughnutChart = new Chart(this._doughnutChartElem, doughnutChartConfig);
    const lineChart = new Chart(this._lineChartElem, lineChartConfig);

    this._updateChartColor(doughnutChart, 'doughnutChart', userData);
    this._updateChartColor(lineChart, 'lineChart', userData);
  }

  //it takes a chart which and a chart variable which user want to update
  _updateChartColor(chart, chartName, userData) {
    const { charts } = userData.data.preference;

    const bgColorArr = ['rgba(192, 140, 236, 1)', 'rgba(95, 142, 219, 1)', 'rgba(244, 67, 115, 1)', 'rgba(224, 183, 26, 1)', 'rgba(112, 129, 243, 1)', 'rgba(233, 212, 245, 1)', 'rgba(195, 199, 244, 1)', 'rgba(255, 0, 20, 1)', 'rgba(109, 106, 255, 1)', 'rgba(231, 194, 122, 1)'];

    switch (chartName) {
      case 'doughnutChart':
        chart.config.type = charts.roi;
        if (charts.roi === 'line') chart.config.data.datasets[0].borderColor = 'rgba(142, 74, 237, 0.8)';
        break;
      case 'lineChart':
        if (charts.bi !== 'line') {

          chart.config.type = charts.bi;
          chart.config.data.datasets[0].backgroundColor = [...bgColorArr];

          chart.config.data.datasets[0].borderColor = '#fff';

          if (charts.bi === 'line') {
            chart.config.data.datasets[0].backgroundColor = '#fff';

            chart.config.data.datasets[0].borderColor = 'rgba(142, 74, 237, 0.8)';
          }
        }
        break;
      default:
        return
    }
    chart.update();
  }
}

export default new ChartView();