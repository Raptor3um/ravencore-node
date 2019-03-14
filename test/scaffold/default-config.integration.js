'use strict';

var path = require('path');
var should = require('chai').should();
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('#defaultConfig', function() {
  var expectedExecPath = path.resolve(__dirname, '../../bin/raptoreumd');

  it('will return expected configuration', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3001,
      services: [
        'raptoreumd',
        'web'
      ],
      servicesConfig: {
        raptoreumd: {
          spawn: {
            datadir: process.env.HOME + '/.rtmcore/data',
            exec: expectedExecPath
          }
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.rtmcore/rtmcore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        }
      },
      mkdirp: {
        sync: sinon.stub()
      }
    });
    var home = process.env.HOME;
    var info = defaultConfig();
    info.path.should.equal(home + '/.rtmcore');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3001);
    info.config.services.should.deep.equal(['raptoreumd', 'web']);
    var raptoreumd = info.config.servicesConfig.raptoreumd;
    should.exist(raptoreumd);
    raptoreumd.spawn.datadir.should.equal(home + '/.rtmcore/data');
    raptoreumd.spawn.exec.should.equal(expectedExecPath);
  });
  it('will include additional services', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3001,
      services: [
        'raptoreumd',
        'web',
        'insight-api',
        'insight-ui'
      ],
      servicesConfig: {
        raptoreumd: {
          spawn: {
            datadir: process.env.HOME + '/.rtmcore/data',
            exec: expectedExecPath
          }
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.rtmcore/rtmcore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        }
      },
      mkdirp: {
        sync: sinon.stub()
      }
    });
    var home = process.env.HOME;
    var info = defaultConfig({
      additionalServices: ['insight-api', 'insight-ui']
    });
    info.path.should.equal(home + '/.rtmcore');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3001);
    info.config.services.should.deep.equal([
      'raptoreumd',
      'web',
      'insight-api',
      'insight-ui'
    ]);
    var raptoreumd = info.config.servicesConfig.raptoreumd;
    should.exist(raptoreumd);
    raptoreumd.spawn.datadir.should.equal(home + '/.rtmcore/data');
    raptoreumd.spawn.exec.should.equal(expectedExecPath);
  });
});
