import minimalAccInfo from './minimalAccView.js';
import fundTransferView from './fundTransferView.js';
import statisticsView from './statisticsView.js';
import chartView from './chartView.js'

class DashboardView {
  _parentElement = document.querySelector('main');

  renderDashboardView() {
    minimalAccInfo.renderMinimalAccView();
//    chartView.renderChart();
    statisticsView.renderStatisticsView();
    fundTransferView.renderFundTransferView();
  }
  
  
}

export const dashboard = new DashboardView();
