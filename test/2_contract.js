const {utils} = require('web3');
const BTCCapOracle = artifacts.require('BTCCapOracle');
const {getBTCCap} = require('../src/getBTCCap');

contract('BTCCapOracle', accounts => {
  describe('contract attributes', () => {
    let instance;

    beforeEach(async () => {
      instance = await BTCCapOracle.deployed();
    });

    it('returns a number', async () => {
      const cap = await instance.getBTCCap();
      assert(utils.BN.isBN(cap));
    });
    
    it('fires an event', async () => {
      let eventReceived = false;
      instance.CallbackGetBTCCap().on('data', () => {eventReceived = true});
      await instance.updateBTCCap();
      assert.equal(eventReceived, true);
    });

    it('stores the proper market cap', done => {
      instance.CallbackGetBTCCap().on('data', async () => {
        let retrievedCap = await getBTCCap();
        await instance.setBTCCap(retrievedCap, {from: accounts[0]});
        let updatedCap = utils.toBN(await instance.getBTCCap()).toNumber();
        assert.equal(retrievedCap, updatedCap);
        done(); 
      });

      instance.updateBTCCap();
    });
  });
});
