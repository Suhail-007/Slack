import {chartTypes} from '../helper.js';

//xAxisData
const months = [
  'January',
  'Februray',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  ];

//yAxisData
const data = [0.30, 0.45, 0.35, 0.55, 0.35, 0.5, 0.80, 0.60, 0.2];

const config = {
  type: chartTypes.typeTwo,
  data: {
    labels: months,
    datasets: [{
      data: data,
      borderColor: 'rgba(142, 74, 237, 0.8)',
      backgroundColor: '#fff',
      fill: {
        target: 'origin',
        above:(context) => {
          const chart = context.chart;
          const { data, chartArea, scales, ctx } = chart;
          if (!chartArea) return null
          return belowGradient(ctx, data, chartArea, scales)
        }
      },
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
        text: 'Binary Income || Direct Income'
      }
    }
  },
};

function belowGradient(ctx, data, chartArea, scales) {
  const { left, right, top, bottom, width, height } = chartArea;
  const { x, y } = scales;
  const shift = y.getPixelForValue(data.datasets[0].data[0]);
  const gradientBackground = ctx.createLinearGradient(0, shift, 0, bottom);

  gradientBackground.addColorStop(0, 'rgba(142, 74, 237, 0.4)');
  gradientBackground.addColorStop(1, 'rgba(142, 74, 237, 0.1)');
  return gradientBackground;

}

export default config 
