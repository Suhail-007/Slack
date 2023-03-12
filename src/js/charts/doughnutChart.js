//xAxisData
const months = [
  'January',
  'Februray',
  'March',
  'April',
  'May',
  'June',
  ];

//yAxisData
const data = [0.30, 0.45, 0.35, 0.55, 0.35, 0.5];

function config(chartType) {
  return {
    type: chartType,
    data: {
      labels: months,
      datasets: [{
        data: data,
        borderColor: '#fff',
        backgroundColor: ['rgba(192, 140, 236, 1)', 'rgba(95, 142, 219, 1)', 'rgba(244, 67, 115, 1)', 'rgba(224, 183, 26, 1)', 'rgba(112, 129, 243, 1)', 'rgba(233, 212, 245, 1)'],
          }],
    },

    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'ROI Status',
        },
      },
    },
  }
}

export default config