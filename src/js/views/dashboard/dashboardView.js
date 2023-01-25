import View from '../View.js'
import minimalAccInfo from './minimalAccView.js';
import fundAndReferralView from './fundAndReferralView.js';
import statisticsView from './statisticsView.js';
import chartView from './chartView.js';

class DashboardView extends View {
  _parentElem = document.querySelector('main');

  _generateMarkup() {
    const sections = `
      ${minimalAccInfo.renderData(this._data, false, false)}
      ${chartView.renderChart()}
      ${statisticsView.renderData(this._data, false, false)}
      ${fundAndReferralView.renderData(this._data, false, false)}`;
    return sections;
  }

  init(updateUserData) {
    this.setTitle('Dashboard || Slack');
    fundAndReferralView.init(updateUserData);
  }
}

export default new DashboardView();