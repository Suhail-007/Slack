export function investCard(props) {
  const {price, iconName, heading } = props;
  return `
    <div class="invest-card invest-card-${iconName} card--vertical flex-row-AI-center">
      <div class="invest-wallet__heading flex-row-AI-center">
        <svg class="md-svg">
          <use href="./src/images/icons.svg#icon-${iconName}"></use>
        </svg>
        <h4 class="heading heading__h4 bitcoin-heading">${heading}</h4>
      </div>

      <p class='openat'>open <span class='price' data-price>${price}</span></p>

      <span>More</span>
    </div>`
}