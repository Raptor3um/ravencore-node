'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export rtmcore-lib', function() {
    var rtmcore = require('../');
    should.exist(rtmcore.lib);
    should.exist(rtmcore.lib.Transaction);
    should.exist(rtmcore.lib.Block);
  });
});
