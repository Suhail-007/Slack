class ChartView {
  _pieChart
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
  }

  i() {
    const pieChartCanvas = document.getElementById('roi');
    const lineChartCanvas = document.getElementById('lines').getContext('2d');

    export const lineChart = new Chart(lineChartCanvas, lineConfig);
    export const pieChart = new Chart(pieChartCanvas, pieConfig);

  }
}
