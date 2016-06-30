'use strict';
let App = require('../lib/app');
let restify = require('restify');
let should = require('should');
let deride = require('deride');

describe('Server', () => {
  let client, app, mockSymbolManager;

  before(done => {
    let targetPort = 9001;
    client = restify.createJsonClient({
      url: 'http://127.0.0.1:' + targetPort,
      version: require('../package.json').version
    }); 
    mockSymbolManager = deride.stub(['add']);
    mockSymbolManager.setup.add.toCallbackWith(null);
    app = new App(targetPort, mockSymbolManager);
    app.start(done);
  });

  after(() => {
    app.stop();
  });

  it.only('should accept PUT requests for symbols', (done) => {
    client.put('/symbol/LON/VM', null, (err, req, res) => {
      should.ifError(err);
      should(res.statusCode).eql(200);
      mockSymbolManager.expect.add.called.once();
      done();
    });
  });

});
