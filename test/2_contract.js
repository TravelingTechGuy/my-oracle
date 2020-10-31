const {utils} = require('web3');
const BTCCapOracle = artifacts.require('BTCCapOracle');
const {getBTCCap} = require('../src/getBTCCap');

contract('BTCCapOracle', accounts => {
  const [owner, user, _] = accounts;

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
      instance.CallbackGetBTCCap().once('data', data => {
        assert.equal(data.args.caller, user);
        done();
      });
      instance.updateBTCCap({from: user});
    });

    it('updates and stores the proper market cap', done => {
      instance.CallbackGetBTCCap().on('data', async () => {
        let retrievedCap = await getBTCCap();
        await instance.setBTCCap(retrievedCap, {from: accounts[0]});
        let updatedCap = utils.toBN(await instance.getBTCCap()).toNumber();
        assert.equal(retrievedCap, updatedCap);
        done(); 
      });

      instance.updateBTCCap();
    });

    it('owner can set cap', async () => {
      const newCap = 10;
      await instance.setBTCCap(newCap, {from: owner});
      const cap = utils.toBN(await instance.getBTCCap()).toNumber();
      assert.equal(cap, newCap);
    });

    it('user who is not owner cannot set cap', async () => {
      try {
        const newCap = 10;
        await instance.setBTCCap(newCap, {from: user});
        assert.fail('should not work');
      }
      catch(err) {
        assert(err.message.includes('This function is restricted to the contract\'s owner'));
      }
    });
  });
});
