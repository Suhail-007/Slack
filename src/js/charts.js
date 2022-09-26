import lineConfig from './charts/lineChart.js'
import pieConfig from './charts/pieChart.js'

const pieChartCanvas = document.getElementById('roi');
const lineChartCanvas = document.getElementById('lines').getContext('2d');

export const lineChart = new Chart(lineChartCanvas, lineConfig);
export const pieChart = new Chart(pieChartCanvas, pieConfig);
