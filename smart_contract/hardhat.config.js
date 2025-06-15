require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-goerli.g.alchemy.com/v2/wsjXIsuaytTcv6sfynRGrqPMAy0j2S8-',    //alchemy https key for ethereum test
      accounts: ['58c9a4e2890b3728f9e1f248863b34e70b63f5529b8b520e0886b836f401b9ff'],  //private key of my ethereum wallet
    },
  },
};

// to build our smart_contract test