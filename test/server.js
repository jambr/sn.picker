'use strict';
let Server = require('sn.core').Server;
let restify = require('restify');

describe('Server', () => {
  let client, server;

  before(done => {
    let targetPort = 9001;
    client = restify.createJsonClient({
      url: 'http://127.0.0.1:' + targetPort,
      version: require('../package.json').version
    }); 
    server = new Server(targetPort);
    server.start(done);
  });

  after(() => {
    server.stop();
  });
});
