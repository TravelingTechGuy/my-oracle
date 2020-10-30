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
    
    //use `.once` for events, to prevnt having the event around for the next test
    //in "real life", use `.on`
    it('fires an event', done => {
      instance.CallbackGetBTCCap().once('data', () => {
        done();
      });
      instance.updateBTCCap();
    });

    it('event returns address of caller', done => {
      let address = accounts[2];
      instance.CallbackGetBTCCap().once('data', data => {
        assert.equal(data.args.caller, address);
        done();
      });
      instance.updateBTCCap({from: address});
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
