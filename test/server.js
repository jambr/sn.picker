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
    mockSymbolManager = deride.stub(['add', 'remove']);
    mockSymbolManager.setup.add.toCallbackWith(null);
    mockSymbolManager.setup.remove.toCallbackWith(null);
    app = new App(targetPort, mockSymbolManager);
    app.start(done);
  });

  after(() => {
    app.stop();
  });

  it('should accept PUT requests for symbols', (done) => {
    client.put('/symbol/LON/VM', null, (err, req, res) => {
      should.ifError(err);
      should(res.statusCode).eql(201);
      mockSymbolManager.expect.add.called.once();
      done();
    });
  });

  it('should accept DELETE requests for symbols', (done) => {
    client.del('/symbol/LON/VM', (err, req, res) => {
      should.ifError(err);
      should(res.statusCode).eql(204);
      mockSymbolManager.expect.add.called.once();
      done();
    });
  });

});
