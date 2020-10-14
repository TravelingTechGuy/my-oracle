const contract = require('@truffle/contract');
const Web3 = require('web3');
const OracleContract = require('../build/contracts/BTCCapOracle.json');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

// Truffle abstraction to interact with our deployed contract
let oracleContract = contract(OracleContract);
oracleContract.setProvider(web3.currentProvider);

// Get accounts from web3
web3.eth.getAccounts(async (err, accounts) => {
  try {
    const oracleInstance = await oracleContract.deployed();
    // Our promises
    const oraclePromises = [
      oracleInstance.getBTCCap(),  // Get currently stored BTC Cap
      oracleInstance.updateBTCCap({from: accounts[0]})  // Request oracle to update the information
    ];

    // Map over all promises
    const result = await Promise.all(oraclePromises)
    console.log('BTC Market Cap: ' + result[0]);
    console.log('Requesting Oracle to update BTC Cap Information...');
  }
  catch(err) {
    console.error(err);
  }
});
