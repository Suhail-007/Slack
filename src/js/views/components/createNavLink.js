const navLinks = [
  {
    name: 'dashboard',
    icon: './src/images/icons.svg#icon_dashboard'
  },
  {
    name: 'profile',
    icon: './src/images/icons.svg#icon_profile'
  },
  {
    name: 'invest wallet',
    icon: './src/images/icons.svg#icon_invest-wallet'
  },
  {
    name: 'Team summary',
    icon: './src/images/icons.svg#icon_team-summary',
  },
  {
    name: 'Income',
    icon: './src/images/icons.svg#icon_income'
  },
  {
    name: 'withdrawal wallet',
    icon: './src/images/icons.svg#icon_withdraw-wallet'
  },
  {
    name: 'Deposit fund transfer',
    icon: './src/images/icons.svg#icon-wallet'
  },
  {
    name: 'reports',
    icon: './src/images/icons.svg#icon_report'
  },
  {
    name: 'structure balance',
    icon: './src/images/icons.svg#icon_structure-balance'
  },
  {
    name: 'logout',
    icon: './src/images/icons.svg#icon_logout'
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