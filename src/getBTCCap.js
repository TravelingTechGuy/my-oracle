const fetch = require('node-fetch');

exports.getBTCCap = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=USD&include_market_cap=true');
    const result = await response.json();
    return parseInt(result.bitcoin.usd_market_cap, 10);
  }
  catch(err) {
    console.error(err);
    throw err;
  }
};
