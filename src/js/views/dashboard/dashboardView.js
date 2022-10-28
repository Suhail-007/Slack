import * as model from '../../model.js'
import minimalAccInfo from './minimalAccView.js';
import fundTransferView from './fundTransferView.js';
import statisticsView from './statisticsView.js';
import chartView from './chartView.js'

class DashboardView {
  _parentElement = document.querySelector('main');

  renderDashboardView() {
    minimalAccInfo.renderMinimalAccView();
    chartView.renderChart();
    statisticsView.renderStatisticsView();
    fundTransferView.renderFundTransferView();
  }

  addHandlerNavTabs(handler) {
    const tabContainer = document.querySelector('[data-nav]');
    tabContainer.addEventListener('click', handler);
  }
  
}

export default new DashboardView();
