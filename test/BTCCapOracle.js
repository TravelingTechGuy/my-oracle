const {utils} = require('web3');
const BTCCapOracle = artifacts.require('BTCCapOracle');

contract('BTCCapOracle', accounts => {
  describe('contract attributes', () => {
    let instance;

    beforeEach(async () => {
      // instance = await MyToken.new(_name, _symbol);
      instance = await BTCCapOracle.deployed();
    });

    it('returns an integer', async () => {
      const cap = Number(utils.fromWei(await instance.getBTCCap(), 'ether'));
      assert(Number.isInteger(cap));
    });
  });
});
