'use strict';

var createError = require('errno').create;

var rtmcoreNodeError = createError('rtmcoreNodeError');

var RPCError = createError('RPCError', rtmcoreNodeError);

module.exports = {
  Error: rtmcoreNodeError,
  RPCError: RPCError
};
