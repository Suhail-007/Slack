export function investCard(props) {
  const {price, icon, heading, className} = props;
  return `
    <div class="invest-card invest-card-${className} card--horizontal flex-row-AI-center">
      <div class="invest-wallet__heading flex-row-AI-center">
        <svg class="md-svg">
          <use href="${icon}"></use>
        </svg>
        <h4 class="heading heading__h4 bitcoin-heading">${heading}</h4>
      </div>

      <p class='openat'>open <span class='price' data-price='${className}'>${price}</span></p>

      <span>More</span>
    </div>`
}