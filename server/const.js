const _ = require('lodash');

const enums = [
  'CONFIG_SECTION_INVALID',
  'REDIS_CONNECTION_FAILED'
];

global.ENUM = () => {
  var obj = {}, i = 1000;
  enums.forEach((e) => {
    obj[e] = i++;
  });
  return obj;
}();

global.APP = {
  exit: function (code) {
    if (code && code >= 0) {
      LOG.error('Fatal non-zero exit code ' + code + ': ' + enums[code - 1000]);
    }
    process.exit(code);
  }
};

global.CREST_URL = 'https://crest-tq.eveonline.com';

global.REGIONS = [
  { id: 10000001, name: 'Derelik' },
  { id: 10000002, name: 'The Forge' },
  { id: 10000003, name: 'Vale of the Silent' },
  { id: 10000005, name: 'Detorid' },
  { id: 10000006, name: 'Wicked Creek' },
  { id: 10000007, name: 'Cache' },
  { id: 10000008, name: 'Scalding Pass' },
  { id: 10000009, name: 'Insmother' },
  { id: 10000010, name: 'Tribute' },
  { id: 10000011, name: 'Great Wildlands' },
  { id: 10000012, name: 'Curse' },
  { id: 10000013, name: 'Malpais' },
  { id: 10000014, name: 'Catch' },
  { id: 10000015, name: 'Venal' },
  { id: 10000016, name: 'Lonetrek' },
  { id: 10000018, name: 'The Spire' },
  { id: 10000020, name: 'Tash-Murkon' },
  { id: 10000021, name: 'Outer Passage' },
  { id: 10000022, name: 'Stain' },
  { id: 10000023, name: 'Pure Blind' },
  { id: 10000025, name: 'Immensea' },
  { id: 10000027, name: 'Etherium Reach' },
  { id: 10000028, name: 'Molden Heath' },
  { id: 10000029, name: 'Geminate' },
  { id: 10000030, name: 'Heimatar' },
  { id: 10000031, name: 'Impass' },
  { id: 10000032, name: 'Sinq Laison' },
  { id: 10000033, name: 'The Citadel' },
  { id: 10000034, name: 'The Kalevala Expanse' },
  { id: 10000035, name: 'Deklein' },
  { id: 10000036, name: 'Devoid' },
  { id: 10000037, name: 'Everyshore' },
  { id: 10000038, name: 'The Bleak Lands' },
  { id: 10000039, name: 'Esoteria' },
  { id: 10000040, name: 'Oasa' },
  { id: 10000041, name: 'Syndicate' },
  { id: 10000042, name: 'Metropolis' },
  { id: 10000043, name: 'Domain' },
  { id: 10000044, name: 'Solitude' },
  { id: 10000045, name: 'Tenal' },
  { id: 10000046, name: 'Fade' },
  { id: 10000047, name: 'Providence' },
  { id: 10000048, name: 'Placid' },
  { id: 10000049, name: 'Khanid' },
  { id: 10000050, name: 'Querious' },
  { id: 10000051, name: 'Cloud Ring' },
  { id: 10000052, name: 'Kador' },
  { id: 10000053, name: 'Cobalt Edge' },
  { id: 10000054, name: 'Aridia' },
  { id: 10000055, name: 'Branch' },
  { id: 10000056, name: 'Feythabolis' },
  { id: 10000057, name: 'Outer Ring' },
  { id: 10000058, name: 'Fountain' },
  { id: 10000059, name: 'Paragon Soul' },
  { id: 10000060, name: 'Delve' },
  { id: 10000061, name: 'Tenerifis' },
  { id: 10000062, name: 'Omist' },
  { id: 10000063, name: 'Period Basis' },
  { id: 10000064, name: 'Essence' },
  { id: 10000065, name: 'Kor-Azor' },
  { id: 10000066, name: 'Perrigen Falls' },
  { id: 10000067, name: 'Genesis' },
  { id: 10000068, name: 'Verge Vendor' },
  { id: 10000069, name: 'Black Rise' }
];
global.region = function (region) {
  if (typeof region === 'number') return _.find(REGIONS, (r) => { return r.id === region });
  else if (typeof region === 'string') return _.find(REGIONS, (r) => { return r.name === region });
  else throw new Error('Must specifiy region by ID or name');
};

// Market timings.
global.MARKET_TIME = 6;
global.MARKET_TIME_S = MARKET_TIME * 60 * 60;
global.MARKET_TIME_MS = MARKET_TIME_S * 1000;
