const {getBTCCap} = require('../src/getBTCCap');

describe('getting btc cap', () =>{
  it('should get bitcoin market cap as integer', async () => {
    const result = await getBTCCap();
    assert(Number.isInteger(result));
    assert(result > 0);
  });
});
