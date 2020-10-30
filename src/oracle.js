const {ethers, Contract} = require('ethers');
const {getBTCCap} = require('./getBTCCap');
const OracleContract = require('../build/contracts/BTCCapOracle.json');

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider('http://localhost:7545');

  // Getting the accounts
  const signer = await provider.getSigner(0);
  const adminAccount = await signer.getAddress();
  const contract = new Contract(
    OracleContract.networks['5777'].address,
    OracleContract.abi,
    signer
  );
  
  const instance = await contract.deployed();
  // listen to event
  instance.on('CallbackGetBTCCap', async data => {
    console.log('Oracle called at ', (new Date()).toLocaleTimeString());
    // get value from internet
    const btcMarketCap = await getBTCCap();
    console.log('value retrieved: ', btcMarketCap);
    // Send data back contract on-chain
    await instance.setBTCCap(btcMarketCap, {from: adminAccount});
    console.log('value saved to contract');
  });
};

main();
