const contract = require('@truffle/contract');
const Web3 = require('web3');
const {getBTCCap} = require('./getBTCCap');
const OracleContract = require('../build/contracts/BTCCapOracle.json');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
// Truffle abstraction to interact with our deployed contract
let oracleContract = contract(OracleContract);
oracleContract.setProvider(web3.currentProvider);

// Get accounts from web3
web3.eth.getAccounts(async (err, accounts) => {
  try {
    const oracleInstance = await oracleContract.deployed();
    // Watch event and respond to event with a callback function
    oracleInstance.CallbackGetBTCCap()
      .on('transactionHash', console.log)
      .on('receipt', console.log)
      .on('error', console.error)
      .on('confirmation', (num, receipt) => console.log(num, receipt))
      .on('data', async event => {
        console.log('update requested!', event);
        try {  
          // Fetch data and update it into the contract
          const btcMarketCap = await getBTCCap();
          // Send data back contract on-chain
          oracleInstance.setBTCCap(btcMarketCap, {from: accounts[0]});
        }
        catch(err) {
          console.error(err);
        }
      });
  }
  catch(err) {
    console.error(err);
  }
});
