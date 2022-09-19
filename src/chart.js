const myChart = document.getElementById('myC');

const lineChart = new Chart(myChart, {
  type: 'line',
  data: {
    labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'Sep',
    'Oct',
    'Nov',
    'Dec'],
    datasets: [{
      label: 'My first dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: '#000',
      data: [0, 10, 5, 2, 20, 35, 30, 45, 50, 55, 60],
    }],
  },
});

export default lineChart
