import icons from '../../images/icons.svg';
const navLinks = [
  {
    name: 'home',
    icon: `${icons}#icon_dashboard`
  },
  {
    name: 'profile',
    icon: `${icons}#icon_profile`
  },
  {
    name: 'invest wallet',
    icon: `${icons}#icon_invest-wallet`
  },
  {
    name: 'Team summary',
    icon: `${icons}#icon_team-summary`
  },
  {
    name: 'Income',
    icon: `${icons}#icon_income`
  },
  {
    name: 'withdrawal wallet',
    icon: `${icons}#icon_withdraw-wallet`
  },
  {
    name: 'Deposit fund transfer',
    icon: `${icons}#icon_wallet`
  },
  {
    name: 'reports',
    icon: `${icons}#icon_report`
  },
  {
    name: 'structure balance',
    icon: `${icons}#icon_structure-balance`
  },
  {
    name: 'logout',
    icon: `${icons}#icon_logout`
  }
]

const creaneNavLinks = function() {

  return navLinks.map(link => {
    return `
      <li data-nav="${link.name}" class="nav_item nav-link">
        <svg>
          <use xlink:href="${link.icon}"></use>
        </svg>
        <span class="nav__item--name">${link.name}</span>
      </li>
    `
  }).join('')
}

export default creaneNavLinks