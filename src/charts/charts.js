import * as lineChartData from './lineChart.js'
const myChart = document.getElementById('lines').getContext('2d');

/*const DATA_COUNT = 7;

const labels = [
  'January',
  'Februray',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  ];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: ['9', '5', '10', '6', '15', '10'],
      borderColor: 'red',
      backgroundColor: 'red',
      order: 1
    },
    {
      label: 'Dataset 2',
      data: ['2', '4', '10', '15', '20'],
      borderColor: 'blue',
      backgroundColor: 'blue',
      type: 'line',
      order: 0
    }
  ]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Combined Line/Bar Chart'
      }
    }
  },
};

export const lineChart = new Chart(myChart, config)*/

//export const lineChart = new Chart(myChart, lineChartData.config);

const data = [{ x: 'Jan', net: '100', gm: '50', cogs: '50' }, { x: 'Feb', net: '120', gm: '55', cogs: '75' }];

const config = {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb'],
    datasets: [{
      label: 'Net Profit',
      data: data,
      parsing: {
        yAxisKey: 'net'
      }
    },
    {
      label: 'gross margin',
      data:data,
      parsing: {
        yAxisKey: 'gm'
      }
    },
    {
      label: 'cost of goods sold',
      data:data,
      parsing: {
        yAxisKey: 'cogs'
      }
    }
    
    ]
  },
}



export const lineChart = new Chart(myChart,config) //{
  


  /* type: 'line',
data: {
    datasets: [{
        data: [{ 'data.key': 'one', 'data.value': 20 }, { 'data.key': 'two', 'data.value': 30 }],
        label: 'Practicing',
 //     clip: {left: 10, top: 20, right: 20, bottom: 20},
     
     order: 0,
  //   parsing: false,
  
        
    }
    
    ],

},
options: {
    parsing: {
      xAxisKey: 'data\\.key',
      yAxisKey: 'data\\.value'
    }
}
*/


  /* type: 'line',
  data: {
    labels: [
  'January',
  'Februray',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  ],
    datasets: [{
      label: 'Binary Income',
      backgroundColor: 'rgb(255, 99, 132))',
      borderColor: 'blue',
   borderColor: (context) => {
     const chart = context.chart;
     const { ctx, chartArea, data, scales } = chart;
     if (!chartArea) return null
     return getGradient(ctx, data, chartArea, scales);
   },
// data: [{x: 10}, {y: 20}, {x: 15}, {y: 10}],
    data: ['9', '5', '10', '6', '15', '10'],
      tension: 0.6,
      fill: {
        target: {
          value: '9'
        },
        above: 'rgba(255,77,52,0.3)',
        below: 'red',
      },
     }]
  },
  options: {
    legend: {
      display: true,
    },
    
    }*/
//})

function getGradient(ctx, data, chartArea, scales) {
  const { left, right, top, bottom, width, height } = chartArea;
  const { x, y } = scales;
  const gradientBorder = ctx.createLinearGradient(0, 0, 0, bottom);
  const shift = y.getPixelForValue(data.datasets[0].data[0]) / bottom;

  gradientBorder.addColorStop(shift, 'blue');
  gradientBorder.addColorStop(shift, 'blue');
  //  gradientBorder.addColorStop(1, 'red');
  return gradientBorder;

}