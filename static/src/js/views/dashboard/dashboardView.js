import View from '../View.js'
import minimalAccInfo from './minimalAccView.js';
import fundTransferView from './renderReferralTransferView.js';
import statisticsView from './statisticsView.js';
import chartView from './chartView.js';

class DashboardView extends View {
  _parentElem = document.querySelector('main');
  
  constructor() {
    super()
    this.setTitle('Slack || Dashboard');
  }

  generateDashboardSections() {
    this._parentElem.innerHTML = '';
    const sections = `
    ${minimalAccInfo.renderMinimalAccView()}
    ${chartView.generateChartMarkup()}
    ${statisticsView.renderStatisticsView()}
    ${fundTransferView.renderReferralTransferView()}
    `
    this._parentElem.insertAdjacentHTML('beforeend', sections);

    // chartView.createChart();
  }

  addHandlerNavTabs(handler) {
    const tabContainer = document.querySelector('[data-nav]');
    tabContainer.addEventListener('click', handler);
  }
}

export default new DashboardView();