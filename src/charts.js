import lineConfig from './charts/lineChart.js'
import pieConfig from './charts/pieChart.js'

const pieChartElem = document.getElementById('roi');
const lineChartElem = document.getElementById('lines').getContext('2d');

export const lineChart = new Chart(lineChartElem, lineConfig);
export const pieChart = new Chart(pieChartElem, pieConfig);
