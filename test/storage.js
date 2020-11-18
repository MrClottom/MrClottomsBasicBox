const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers')

const Storage = artifacts.require('Storage')

const { assert } = require('chai')

contract('Storage', ([main, user, adversary, ...moreAccounts]) => {
  it('correct owner', async () => {
    const storage = await Storage.new()
    assert.equal(main, await storage.owner.call())
  })
  it('can store data', async () => {
    const storage = await Storage.new()

    assert.equal(await storage.data.call(), null, 'Invalid starting data')

    await expectRevert(
      storage.setData(web3.utils.asciiToHex('hello'), { from: adversary }),
      'Ownable: caller is not the owner'
    )

    const newData = 'hello, this is some data'
    const encodedNewData = web3.utils.asciiToHex(newData)
    expectEvent(await storage.setData(encodedNewData, { from: main }), 'DataSet', {
      newData: encodedNewData
    })

    const setRawData = await storage.data.call()
    const setData = web3.utils.hexToAscii(setRawData)
    assert.equal(setData, newData, 'Incorrect data stored')
  })
})
