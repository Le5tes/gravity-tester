const getStub = require('./test-utils/test-utils').getStub;

global.performance = {now: getStub()};