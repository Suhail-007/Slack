import View from '../View.js'
import minimalAccInfo from './minimalAccView.js';
import fundTransferView from './renderReferralTransferView.js';
import statisticsView from './statisticsView.js';
import chartView from './chartView.js';

class DashboardView extends View {
  _parentElem = document.querySelector('main');

  async renderDashboardMarkup() {
    this._parentElem.innerHTML = '';
    minimalAccInfo.renderMinimalAccView();
    chartView.renderChart();
    statisticsView.renderStatisticsView();
    fundTransferView.renderReferralTransferView();
  }

  addHandlerNavTabs(handler) {
    const tabContainer = document.querySelector('[data-nav]');
    tabContainer.addEventListener('click', handler);
  }

}

export default new DashboardView();
