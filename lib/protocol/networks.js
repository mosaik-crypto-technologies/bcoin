/*!
 * network.js - bitcoin networks for bcoin
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

/**
 * @module protocol/networks
 */

const BN = require('../crypto/bn');

const network = exports;
let main, testnet, regtest, segnet4, simnet, bitcoincash;

/**
 * Network type list.
 * @memberof module:protocol/networks
 * @const {String[]}
 * @default
 */

network.types = ['main', 'testnet', 'regtest']; // , 'segnet4', 'simnet', 'bitcoincash'];

/**
 * Mainnet
 * @static
 * @lends module:protocol/networks
 * @type {Object}
 */

main = network.main = {};

/**
 * Symbolic network type.
 * @const {String}
 * @default
 */

main.type = 'main';

/**
 * Default DNS seeds.
 * @const {String[]}
 * @default
 */

main.seeds = [
  'mainnet.iop.cash',
  'main1.iop.cash',
  'main2.iop.cash',
  'main3.iop.cash',
  'main4.iop.cash',
  'main5.iop.cash'
];

/**
 * Packet magic number.
 * @const {Number}
 * @default
 */

main.magic = 0xd3bbb0fd;

/**
 * Default network port.
 * @const {Number}
 * @default
 */

main.port = 4877;

/**
 * Checkpoint block list.
 * @const {Object}
 */

main.checkpointMap = {
  20000: 'c19bd1e263e8eacdf08ef998f863a8f7f667acfb2092ed9a27ce050200000000',
  47654: '0aec26ccfe6b2a482524e3ba6fa79149078ff03ef3812e82c694841100000000',
  78624: '1361a76a81795b726d7c8088fb53e4b57799e588f4bad84df0da1f0000000000'
};

/**
 * Last checkpoint height.
 * @const {Number}
 * @default
 */

main.lastCheckpoint = 78624;

/**
 * @const {Number}
 * @default
 */

main.halvingInterval = 150000;

/**
 * Genesis block header.
 * @const {NakedBlock}
 */

main.genesis = {
  version: 1,
  hash: 'b32dc8b6bf412cf71abb8d433349f16a77e064bee89bcb56e52e5fbf00000000',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot: 'e12b8f2bef968efbdf2fab49fb3f1c59456e7d9b0f2c4afb4750a92d6dc41b95',
  ts: 1463452181,
  bits: 486604799,
  nonce: 1875087468,
  height: 0
};

/**
 * The network's genesis block in a hex string.
 * @const {String}
 */

main.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '00e12b8f2bef968efbdf2fab49fb3f1c59456e7d9b0f2c4afb4750a92d6dc41b951582'
  + '3a57ffff001d6c90c36f01010000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff3e04ffff001d0104364c61204e6163696f6e'
  + '204d617920313674682032303136202d205361726d69656e746f206365726361206465'
  + '6c2064657363656e736fffffffff0100f2052a01000000434104ce49f9cdc8d23176c8'
  + '18fd7e27e7b614d128a47acfdad0e4542300e7efbd8879f1337af3188c0dcb0747fdf2'
  + '6d0cb3b0fca0f4e5d7aec53c43f4a933f570ae86ac00000000';

/**
 * POW-related constants.
 * @enum {Number}
 * @default
 */

main.pow = {
  /**
   * Default target.
   * @const {BN}
   */

  limit: new BN(
    '00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),

  /**
   * Compact pow limit.
   * @const {Number}
   * @default
   */

  bits: 486604799,

  /**
   * Minimum chainwork for best chain.
   * @const {BN}
   */

  chainwork: new BN(
    '000000000000000000000000000000000000000000000000000e20799b006d2c',
    'hex'
  ),

  /**
   * Desired retarget period in seconds.
   * @const {Number}
   * @default
   */

  targetTimespan: 14 * 24 * 60 * 60,

  /**
   * Average block time.
   * @const {Number}
   * @default
   */

  targetSpacing: 10 * 60,

  /**
   * Retarget interval in blocks.
   * @const {Number}
   * @default
   */

  retargetInterval: 2016,

  /**
   * Whether to reset target if a block
   * has not been mined recently.
   * @const {Boolean}
   * @default
   */

  targetReset: false,

  /**
   * Do not allow retargetting.
   * @const {Boolean}
   * @default
   */

  noRetargeting: false
};

/**
 * Block constants.
 * @enum {Number}
 * @default
 */

main.block = {
  /**
   * Height at which bip34 was activated.
   * Used for avoiding bip30 checks.
   */

  bip34height: -1, /* never */

  /**
   * Hash of the block that activated bip34.
   */

  bip34hash: null,

  /**
   * Height at which bip65 was activated.
   */

  bip65height: 0, /* always */

  /**
   * Hash of the block that activated bip65.
   */

  bip65hash: 'b32dc8b6bf412cf71abb8d433349f16a77e064bee89bcb56e52e5fbf00000000',

  /**
   * Height at which bip66 was activated.
   */

  bip66height: 0, /* always */

  /**
   * Hash of the block that activated bip66.
   */

  bip66hash: 'b32dc8b6bf412cf71abb8d433349f16a77e064bee89bcb56e52e5fbf00000000',

  /**
   * Safe height to start pruning.
   */

  pruneAfterHeight: 1000,

  /**
   * Safe number of blocks to keep.
   */

  keepBlocks: 288,

  /**
   * Age used for the time delta to
   * determine whether the chain is synced.
   */

  maxTipAge: 24 * 60 * 60,

  /**
   * Height at which block processing is
   * slow enough that we can output
   * logs without spamming.
   */

  slowHeight: 80000
};

/**
 * Map of historical blocks which create duplicate transactions hashes.
 * @see https://github.com/bitcoin/bips/blob/master/bip-0030.mediawiki
 * @const {Object}
 * @default
 */

main.bip30 = {};

/**
 * For versionbits.
 * @const {Number}
 * @default
 */

main.activationThreshold = 1916; // 95% of 2016

/**
 * Confirmation window for versionbits.
 * @const {Number}
 * @default
 */

main.minerWindow = 2016; // nPowTargetTimespan / nPowTargetSpacing

/**
 * Deployments for versionbits.
 * @const {Object}
 * @default
 */

main.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 1462060800, // May 1st, 2016
    timeout: 1493596800, // May 1st, 2017
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 0, // undefined
    timeout: 0, // undefined
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0, // undefined
    timeout: 0, // undefined
    threshold: -1,
    window: -1,
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

/**
 * Deployments for versionbits (array form, sorted).
 * @const {Array}
 * @default
 */

main.deploys = [
  main.deployments.csv,
  main.deployments.segwit,
  main.deployments.segsignal,
  main.deployments.testdummy
];

/**
 * Key prefixes.
 * @enum {Number}
 * @default
 */

main.keyPrefix = {
  privkey: 0x31,
  xpubkey: 0x2780915F,
  xprivkey: 0xAE3416F6,
  xpubkey58: '9PPH',
  xprivkey58: 'dywP',
  coinType: 66 // BIP44 code for IOP 
};

/**
 * {@link Address} prefixes.
 * @enum {Number}
 */

main.addressPrefix = {
  pubkeyhash: 0x75,
  scripthash: 0xAE,
  witnesspubkeyhash: 0xAA, //check this again!
  witnessscripthash: 0xAA, //check this again!
  bech32: 'bc' //check this again!
};

/**
 * Default value for whether the mempool
 * accepts non-standard transactions.
 * @const {Boolean}
 * @default
 */

main.requireStandard = true;

/**
 * Default http port.
 * @const {Number}
 * @default
 */

main.rpcPort = 8337;

/**
 * Default min relay rate.
 * @const {Rate}
 * @default
 */

main.minRelay = 1000;

/**
 * Default normal relay rate.
 * @const {Rate}
 * @default
 */

main.feeRate = 100000;

/**
 * Maximum normal relay rate.
 * @const {Rate}
 * @default
 */

main.maxFeeRate = 400000;

/**
 * Whether to allow self-connection.
 * @const {Boolean}
 */

main.selfConnect = false;

/**
 * Whether to request mempool on sync.
 * @const {Boolean}
 */

main.requestMempool = false;

/*
 * Testnet (v3)
 * https://en.bitcoin.it/wiki/Testnet
 */

testnet = network.testnet = {};

testnet.type = 'testnet';

testnet.seeds = [
  'testnet.iop.cash', 
  'test1.iop.cash',
  'test2.iop.cash' 
];

testnet.magic = 0xb350fcb1;

testnet.port = 7475;

testnet.checkpointMap = {
  10000: '2f5e87e031383e21e650a3274c33ceb477702fc73f966bef022c9bb000000000',
  18000: 'fd71a128bcb9aa2516f461dc1b712dc2428c9340886babce10adcce000000000'
};

testnet.lastCheckpoint = 18000;

testnet.halvingInterval = 100000;

testnet.genesis = {
  version: 1,
  hash: 'a3f3d71820ea72609c0ba999e577403120e5be4f4fda0c2363b82b6f00000000',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot: 'e12b8f2bef968efbdf2fab49fb3f1c59456e7d9b0f2c4afb4750a92d6dc41b95',
  ts: 1463452342,
  bits: 486604799,
  nonce: 3335213172,
  height: 0
};

testnet.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '00e12b8f2bef968efbdf2fab49fb3f1c59456e7d9b0f2c4afb4750a92d6dc41b95b682'
  + '3a57ffff001d7450cbc601010000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff3e04ffff001d0104364c61204e6163696f6e'
  + '204d617920313674682032303136202d205361726d69656e746f206365726361206465'
  + '6c2064657363656e736fffffffff0100f2052a01000000434104ce49f9cdc8d23176c8'
  + '18fd7e27e7b614d128a47acfdad0e4542300e7efbd8879f1337af3188c0dcb0747fdf2'
  + '6d0cb3b0fca0f4e5d7aec53c43f4a933f570ae86ac00000000';

testnet.pow = {
  limit: new BN(
    '00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  bits: 486604799,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000000000000',
    'hex'
  ),
  targetTimespan: 14 * 24 * 60 * 60,
  targetSpacing: 10 * 60,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: false
};

testnet.block = {
  bip34height: -1,
  bip34hash: null,
  bip65height: 0,
  bip65hash: 'a3f3d71820ea72609c0ba999e577403120e5be4f4fda0c2363b82b6f00000000',
  bip66height: 0,
  bip66hash: 'a3f3d71820ea72609c0ba999e577403120e5be4f4fda0c2363b82b6f00000000',
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 24 * 60 * 60,
  slowHeight: 18000
};

testnet.bip30 = {};

testnet.activationThreshold = 1512; // 75% for testchains

testnet.minerWindow = 2016; // nPowTargetTimespan / nPowTargetSpacing

testnet.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 1456790400, // March 1st, 2016
    timeout: 1493596800, // May 1st, 2017
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 0, // undefined
    timeout: 0, // undefined
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0xffffffff,
    timeout: 0xffffffff,
    threshold: 269,
    window: 336,
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

testnet.deploys = [
  testnet.deployments.csv,
  testnet.deployments.segwit,
  testnet.deployments.segsignal,
  testnet.deployments.testdummy
];

testnet.keyPrefix = {
  privkey: 0x4c,
  xpubkey: 0xbb8f4852,
  xprivkey: 0x2b7fa42a,
  xpubkey58: 'gpPf',
  xprivkey58: 'AEbG',
  coinType: 1
};

testnet.addressPrefix = {
  pubkeyhash: 0x82,
  scripthash: 0x31,
  witnesspubkeyhash: 0x03, //check this
  witnessscripthash: 0x28, //check this
  bech32: 'tb' // check this
};

testnet.requireStandard = false;

testnet.rpcPort = 14337;

testnet.minRelay = 1000;

testnet.feeRate = 20000;

testnet.maxFeeRate = 60000;

testnet.selfConnect = false;

testnet.requestMempool = false;

/*
 * Regtest
 */

regtest = network.regtest = {};

regtest.type = 'regtest';

regtest.seeds = [
  '127.0.0.1'
];

regtest.magic = 0x9eccb235;

regtest.port = 14877;

regtest.checkpointMap = {};
regtest.lastCheckpoint = 0;

regtest.halvingInterval = 150;

regtest.genesis = {
  version: 1,
  hash: 'b5b87145e5fc1b8c231f9f9d541e9d2b60ae444bb24aaec3ee56364baa5bac13',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot: 'e12b8f2bef968efbdf2fab49fb3f1c59456e7d9b0f2c4afb4750a92d6dc41b95',
  ts: 1463452384,
  bits: 545259519,
  nonce: 2528424328,
  height: 0
};

regtest.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '00e12b8f2bef968efbdf2fab49fb3f1c59456e7d9b0f2c4afb4750a92d6dc41b95e0'
  + '823a57ffff7f2088b1b4960101000000010000000000000000000000000000000000'
  + '000000000000000000000000000000ffffffff3e04ffff001d0104364c61204e6163'
  + '696f6e204d617920313674682032303136202d205361726d69656e746f2063657263'
  + '612064656c2064657363656e736fffffffff0100f2052a01000000434104ce49f9cd'
  + 'c8d23176c818fd7e27e7b614d128a47acfdad0e4542300e7efbd8879f1337af3188c'
  + '0dcb0747fdf26d0cb3b0fca0f4e5d7aec53c43f4a933f570ae86ac00000000';

regtest.pow = {
  limit: new BN(
    '7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  bits: 545259519,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000000000000',
    'hex'
  ),
  targetTimespan: 14 * 24 * 60 * 60,
  targetSpacing: 10 * 60,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: true
};

regtest.block = {
  bip34height: -1,
  bip34hash: null,
  bip65height: 0,
  bip65hash: null,
  bip66height: 0,
  bip66hash: null,
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 0xffffffff,
  slowHeight: 0
};

regtest.bip30 = {};

regtest.activationThreshold = 108; // 75% for testchains

regtest.minerWindow = 144; // Faster than normal for regtest (144 instead of 2016)

regtest.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0xffffffff,
    timeout: 0xffffffff,
    threshold: 269,
    window: 336,
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

regtest.deploys = [
  regtest.deployments.csv,
  regtest.deployments.segwit,
  regtest.deployments.segsignal,
  regtest.deployments.testdummy
];

regtest.keyPrefix = {
  privkey: 0x4c,
  xpubkey: 0xbb8f4852,
  xprivkey: 0x2b7fa42a,
  xpubkey58: 'gpPf',
  xprivkey58: 'AEbG',
  coinType: 1
};

regtest.addressPrefix = {
  pubkeyhash: 0x82,
  scripthash: 0x31,
  witnesspubkeyhash: 0x03, //check this
  witnessscripthash: 0x28, //check this
  bech32: 'rb' // check this
};

regtest.requireStandard = false;

regtest.rpcPort = 18337;

regtest.minRelay = 1000;

regtest.feeRate = 20000;

regtest.maxFeeRate = 60000;

regtest.selfConnect = true;

regtest.requestMempool = true;


// /*
//  * segnet4
//  */

// segnet4 = network.segnet4 = {};

// segnet4.type = 'segnet4';

// segnet4.seeds = [
//   '104.243.38.34',
//   '37.34.48.17'
// ];

// segnet4.magic = 0xc4a1abdc;

// segnet4.port = 28901;

// segnet4.checkpointMap = {};
// segnet4.lastCheckpoint = 0;

// segnet4.halvingInterval = 210000;

// segnet4.genesis = {
//   version: 1,
//   hash: 'b291211d4bb2b7e1b7a4758225e69e50104091a637213d033295c010f55ffb18',
//   prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
//   merkleRoot: '3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a',
//   ts: 1452831101,
//   bits: 503447551,
//   nonce: 0,
//   height: 0
// };

// segnet4.genesisBlock =
//   '0100000000000000000000000000000000000000000000000000000000000000000000'
//   + '003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a7d71'
//   + '9856ffff011e0000000001010000000100000000000000000000000000000000000000'
//   + '00000000000000000000000000ffffffff4d04ffff001d0104455468652054696d6573'
//   + '2030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66'
//   + '207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01'
//   + '000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f'
//   + '61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f'
//   + 'ac00000000';

// segnet4.pow = {
//   // 512x lower min difficulty than mainnet
//   limit: new BN(
//     '000001ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
//     'hex'
//   ),
//   bits: 503447551,
//   chainwork: new BN(
//     '0000000000000000000000000000000000000000000000000000000000800040',
//     'hex'
//   ),
//   targetTimespan: 14 * 24 * 60 * 60,
//   targetSpacing: 10 * 60,
//   retargetInterval: 2016,
//   targetReset: true,
//   noRetargeting: false
// };

// segnet4.block = {
//   bip34height: 8,
//   bip34hash: '6c48386dc7c460defabb5640e28b6510a5f238cdbe6756c2976a7e0913000000',
//   bip65height: 8,
//   bip65hash: '6c48386dc7c460defabb5640e28b6510a5f238cdbe6756c2976a7e0913000000',
//   bip66height: 8,
//   bip66hash: '6c48386dc7c460defabb5640e28b6510a5f238cdbe6756c2976a7e0913000000',
//   pruneAfterHeight: 1000,
//   keepBlocks: 10000,
//   maxTipAge: 7 * 24 * 60 * 60,
//   slowHeight: 50000
// };

// segnet4.bip30 = {};

// segnet4.activationThreshold = 108;

// segnet4.minerWindow = 144;

// segnet4.deployments = {
//   csv: {
//     name: 'csv',
//     bit: 0,
//     startTime: 1456790400, // March 1st, 2016
//     timeout: 1493596800, // May 1st, 2017
//     threshold: -1,
//     window: -1,
//     required: false,
//     force: true
//   },
//   segwit: {
//     name: 'segwit',
//     bit: 1,
//     startTime: 0,
//     timeout: 0xffffffff,
//     threshold: -1,
//     window: -1,
//     required: true,
//     force: false
//   },
//   segsignal: {
//     name: 'segsignal',
//     bit: 4,
//     startTime: 0xffffffff,
//     timeout: 0xffffffff,
//     threshold: 269,
//     window: 336,
//     required: false,
//     force: false
//   },
//   testdummy: {
//     name: 'testdummy',
//     bit: 28,
//     startTime: 1199145601, // January 1, 2008
//     timeout: 1230767999, // December 31, 2008
//     threshold: -1,
//     window: -1,
//     required: false,
//     force: true
//   }
// };

// segnet4.deploys = [
//   segnet4.deployments.csv,
//   segnet4.deployments.segwit,
//   segnet4.deployments.segsignal,
//   segnet4.deployments.testdummy
// ];

// segnet4.keyPrefix = {
//   privkey: 0x9e,
//   xpubkey: 0x053587cf,
//   xprivkey: 0x05358394,
//   xpubkey58: '2793',
//   xprivkey58: '2791',
//   coinType: 1
// };

// segnet4.addressPrefix = {
//   pubkeyhash: 0x1e,
//   scripthash: 0x32,
//   witnesspubkeyhash: 0x04,
//   witnessscripthash: 0x29,
//   bech32: 'sg'
// };

// segnet4.requireStandard = false;

// segnet4.rpcPort = 28902;

// segnet4.minRelay = 1000;

// segnet4.feeRate = 20000;

// segnet4.maxFeeRate = 60000;

// segnet4.selfConnect = false;

// segnet4.requestMempool = true;

// /*
//  * Simnet (btcd)
//  */

// simnet = network.simnet = {};

// simnet.type = 'simnet';

// simnet.seeds = [
//   '127.0.0.1'
// ];

// simnet.magic = 0x12141c16;

// simnet.port = 18555;

// simnet.checkpointMap = {};

// simnet.lastCheckpoint = 0;

// simnet.halvingInterval = 210000;

// simnet.genesis = {
//   version: 1,
//   hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
//   prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
//   merkleRoot: '3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a',
//   ts: 1401292357,
//   bits: 545259519,
//   nonce: 2,
//   height: 0
// };

// simnet.genesisBlock =
//   '0100000000000000000000000000000000000000000000000000000000000000000000'
//   + '003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a4506'
//   + '8653ffff7f200200000001010000000100000000000000000000000000000000000000'
//   + '00000000000000000000000000ffffffff4d04ffff001d0104455468652054696d6573'
//   + '2030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66'
//   + '207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01'
//   + '000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f'
//   + '61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f'
//   + 'ac00000000';

// simnet.pow = {
//   limit: new BN(
//     // High target of 0x207fffff (545259519)
//     '7fffff0000000000000000000000000000000000000000000000000000000000',
//     'hex'
//   ),
//   bits: 545259519,
//   chainwork: new BN(
//     '0000000000000000000000000000000000000000000000000000000000000002',
//     'hex'
//   ),
//   targetTimespan: 14 * 24 * 60 * 60,
//   targetSpacing: 10 * 60,
//   retargetInterval: 2016,
//   targetReset: true,
//   noRetargeting: false
// };

// simnet.block = {
//   bip34height: 0,
//   bip34hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
//   bip65height: 0,
//   bip65hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
//   bip66height: 0,
//   bip66hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
//   pruneAfterHeight: 1000,
//   keepBlocks: 10000,
//   maxTipAge: 0xffffffff,
//   slowHeight: 0
// };

// simnet.bip30 = {};

// simnet.activationThreshold = 75; // 75% for testchains

// simnet.minerWindow = 100; // nPowTargetTimespan / nPowTargetSpacing

// simnet.deployments = {
//   csv: {
//     name: 'csv',
//     bit: 0,
//     startTime: 0, // March 1st, 2016
//     timeout: 0xffffffff, // May 1st, 2017
//     threshold: -1,
//     window: -1,
//     required: false,
//     force: true
//   },
//   segwit: {
//     name: 'segwit',
//     bit: 1,
//     startTime: 0, // May 1st 2016
//     timeout: 0xffffffff, // May 1st 2017
//     threshold: -1,
//     window: -1,
//     required: true,
//     force: false
//   },
//   segsignal: {
//     name: 'segsignal',
//     bit: 4,
//     startTime: 0xffffffff,
//     timeout: 0xffffffff,
//     threshold: 269,
//     window: 336,
//     required: false,
//     force: false
//   },
//   testdummy: {
//     name: 'testdummy',
//     bit: 28,
//     startTime: 1199145601, // January 1, 2008
//     timeout: 1230767999, // December 31, 2008
//     threshold: -1,
//     window: -1,
//     required: false,
//     force: true
//   }
// };

// simnet.deploys = [
//   simnet.deployments.csv,
//   simnet.deployments.segwit,
//   simnet.deployments.segsignal,
//   simnet.deployments.testdummy
// ];

// simnet.keyPrefix = {
//   privkey: 0x64,
//   xpubkey: 0x0420bd3a,
//   xprivkey: 0x0420b900,
//   xpubkey58: 'spub',
//   xprivkey58: 'sprv',
//   coinType: 115
// };

// simnet.addressPrefix = {
//   pubkeyhash: 0x3f,
//   scripthash: 0x7b,
//   witnesspubkeyhash: 0x19,
//   witnessscripthash: 0x28,
//   bech32: 'sc'
// };

// simnet.requireStandard = false;

// simnet.rpcPort = 18556;

// simnet.minRelay = 1000;

// simnet.feeRate = 20000;

// simnet.maxFeeRate = 60000;

// simnet.selfConnect = false;

// simnet.requestMempool = false;


// /*
//  * bitcoincash (Bitcoin Cash)
//  */

// bitcoincash = network.bitcoincash = {};

// bitcoincash.type = 'bitcoincash';

// bitcoincash.seeds = [
//   '127.0.0.1'
// ];

// bitcoincash.magic = 0xd9b4bef9;

// bitcoincash.port = 8333;

// bitcoincash.checkpointMap = {
//   11111: '0000000069e244f73d78e8fd29ba2fd2ed618bd6fa2',
//   33333: '000000002dd5588a74784eaa7ab0507a18ad16a236e',
//   74000: '0000000000573993a3c9e41ce34471c079dcf5f52a0',
//   105000: '00000000000291ce28027faea320c8d2b054b2e0fe',
//   134444: '00000000000005b12ffd4cd315cd34ffd4a594f430',
//   168000: '000000000000099e61ea72015e79632f216fe6cb33',
//   193000: '000000000000059f452a5f7340de6682a977387c17',
//   210000: '000000000000048b95347e83192f69cf0366076336',
//   216116: '00000000000001b4f4b433e81ee46494af945cf960',
//   225430: '00000000000001c108384350f74090433e7fcf79a6',
//   250000: '000000000000003887df1f29024b06fc2200b55f8a',
//   279000: '0000000000000001ae8c72a0b0c301f67e3afca10e',
//   295000: '00000000000000004d9b4ef50f0f9d686fd69db2e0',
//   478559: '000000000000000000651ef99cb9fcbe0dadde1d42'
// };

// bitcoincash.lastCheckpoint = 478559;

// bitcoincash.halvingInterval = 210000;

// bitcoincash.genesis = {
//   version: 1,
//   hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
//   prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
//   merkleRoot: '3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a',
//   ts: 1401292357,
//   bits: 545259519,
//   nonce: 2,
//   height: 0
// };

// bitcoincash.genesisBlock =
//   '0100000000000000000000000000000000000000000000000000000000000000000000'
//   + '003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a4506'
//   + '8653ffff7f200200000001010000000100000000000000000000000000000000000000'
//   + '00000000000000000000000000ffffffff4d04ffff001d0104455468652054696d6573'
//   + '2030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66'
//   + '207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01'
//   + '000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f'
//   + '61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f'
//   + 'ac00000000';

// bitcoincash.pow = {
//   limit: new BN(
//     // High target of 0x207fffff (545259519)
//     '7fffff0000000000000000000000000000000000000000000000000000000000',
//     'hex'
//   ),
//   bits: 545259519,
//   chainwork: new BN(
//     '0000000000000000000000000000000000000000000000000000000000000002',
//     'hex'
//   ),
//   targetTimespan: 14 * 24 * 60 * 60,
//   targetSpacing: 10 * 60,
//   retargetInterval: 2016,
//   targetReset: true,
//   noRetargeting: false
// };

// bitcoincash.block = {
//   bip34height: 227931,
//   bip34hash: '000000000000024b89b42a942fe0d9fea3bb44ab7bd1b19115dd6a759c0808b8',
//   bip65height: 388381,
//   bip65hash: '000000000000000004c2b624ed5d7756c508d90fd0da2c7c679febfa6c4735f0',
//   bip66height: 363725,
//   bip66hash: '00000000000000000379eaa19dce8c9b722d46ae6a57c2f1a988119488b50931',
//   pruneAfterHeight: 100000,
//   keepBlocks: 10000,
//   maxTipAge: 0xffffffff,
//   slowHeight: 0
// };

// bitcoincash.bip30 = {};

// bitcoincash.activationThreshold = 95;

// bitcoincash.minerWindow = 2016; // nPowTargetTimespan / nPowTargetSpacing

// bitcoincash.deployments = {
//   csv: {
//     name: 'csv',
//     bit: 0,
//     startTime: 1462060800, // May 1st, 2016
//     timeout: 1493596800, // May 1st, 2017
//     threshold: -1,
//     window: -1,
//     required: false,
//     force: true
//   },
//   testdummy: {
//     name: 'testdummy',
//     bit: 28,
//     startTime: 1199145601, // January 1, 2008
//     timeout: 1230767999, // December 31, 2008
//     threshold: -1,
//     window: -1,
//     required: false,
//     force: true
//   }
// };

// bitcoincash.deploys = [
//   bitcoincash.deployments.csv,
//   bitcoincash.deployments.testdummy
// ];

// bitcoincash.keyPrefix = {
//   privkey: 0x64,
//   xpubkey: 0x0420bd3a,
//   xprivkey: 0x0420b900,
//   xpubkey58: 'spub',
//   xprivkey58: 'sprv',
//   coinType: 115
// };

// bitcoincash.addressPrefix = {
//   pubkeyhash: 28,
//   scripthash: 40,
//   bech32: 'bc'
// };

// bitcoincash.requireStandard = false;

// bitcoincash.rpcPort = 18332;

// bitcoincash.minRelay = 1000;

// bitcoincash.feeRate = 100000;

// bitcoincash.maxFeeRate = 400000;

// bitcoincash.selfConnect = false;

// bitcoincash.requestMempool = false;
