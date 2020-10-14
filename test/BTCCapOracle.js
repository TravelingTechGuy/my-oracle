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

    it('gets an event', async () => {
      let eventReceived = false;
      instance.CallbackGetBTCCap().on('data', _ => {eventReceived = true});
      await instance.updateBTCCap();
      assert(eventReceived);
    });
  });
});
