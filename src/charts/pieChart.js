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

const config = {
  type: 'doughnut',
  data: {
    labels: months,
    datasets: [{
      data: data,
      borderColor: 'rgba(142, 74, 237, 0.4)',
      backgroundColor: ['rgba(180,180,180,0.2)', 'rgba(180,180,180,0.4)', 'rgba(180,180,180,0.6)', 'rgba(180,180,180,0.8)', '#777'],
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
        text: 'ROI Status'
      }
    }
  },
};

export default config
