export function investCard(price, iconName, heading) {
  return `
    <div class="invest-wallet__cards-cont">
      <div class="invest-card invest-card-${iconName} card--vertical flex-row-AI-center">
        <div class="invest-wallet__heading flex-row-AI-center">
          <svg class="md-svg">
            <use href="./src/images/icons.svg#icon-${iconName}"></use>
          </svg>
          <h4 class="heading heading__h4 bitcoin-heading">${heading}</h4>
        </div>

        <p class="card__price">${price}</p>

        <span>More</span>
      </div>
    </div>`

}