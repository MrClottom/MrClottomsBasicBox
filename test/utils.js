const { assert } = require('chai')

const expectEqualBN = (x, y, errorMsg) =>
  assert.equal(x.toString(), y.toString(), errorMsg)

const expectTransfer = async (from, to, amount, transfer, getBalance) => {
  const beforeFromBalance = await getBalance(from)
  const beforeToBalance = await getBalance(to)

  await transfer()

  const afterFromBalance = await getBalance(from)
  const afterToBalance = await getBalance(to)

  expectEqualBN(
    beforeToBalance.add(amount),
    afterToBalance,
    'amount not credited to recipient'
  )
  expectEqualBN(
    beforeFromBalance.sub(amount),
    afterFromBalance,
    'amount not substracted from sender'
  )
}

const expectERC20Transfer = async (from, to, amount, tokenInstance) => {
  await expectTransfer(
    from,
    to,
    amount,
    async () => tokenInstance.transfer(to, amount, { from }),
    tokenInstance.balanceOf
  )
}

const ZERO_ADDRESS = '0x'.concat('0'.repeat(40))
module.exports = {
  expectEqualBN,
  expectTransfer,
  expectERC20Transfer,
  ZERO_ADDRESS,
}
