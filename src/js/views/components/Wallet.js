export function miniWallet(amount) {
  return `
    <div class="wallet">
      <div data-wallet-btns class="wallet__btns">
        <button class="btn-grey-animated active">Add Fund</button>
        <button class="btn-grey-animated">Withdrawal</button>
      </div>
      ${addFundInput(amount)}
    </div>`
}

export function totalDeposit(amount) {
  return `
    <div class="wallet__deposit-income">
      <p>Total Deposit Income</p>
      <p>${amount}</p>
    </div>
  `
}

export function addFundInput(amount) {
  return `
    <div class="wallet__input-cont">
    ${totalDeposit(amount)}
    
      <label for="amount">Enter amount (in USD)</label>
      <div data-addWithdraw-btns class="wallet__input-cont__input__btns">
        <input id="amount" type="text">
        <button class="btn btn-light-blue active" data-add-fund>Add Fund</button>
        <button class="btn btn-light-blue" data-withdraw-fund>Withdraw Fund</button>
      </div>
    </div>
  `
}