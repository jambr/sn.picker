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
    mockSymbolManager = deride.stub(['get', 'add', 'remove']);
    app = new App(targetPort, mockSymbolManager);
    app.start(done);
  });

  beforeEach(() => {
    mockSymbolManager.setup.add.toCallbackWith(null);
    mockSymbolManager.setup.remove.toCallbackWith(null);
    mockSymbolManager.setup.get.toCallbackWith(null);

    mockSymbolManager.expect.add.called.reset();
    mockSymbolManager.expect.remove.called.reset();
    mockSymbolManager.expect.get.called.reset();
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

  it('adding the same symbol twice should result in a not modified', (done) => {
    client.put('/symbol/LON/VM', null, () => {
      mockSymbolManager.setup.get.toCallbackWith(null, { some: 'model' });
      client.put('/symbol/LON/VM', null, (err, req, res) => {
        should.ifError(err);
        should(res.statusCode).eql(304);
        mockSymbolManager.expect.add.called.once();
        done();
      });
    });
  });

  it('should accept DELETE requests for symbols', (done) => {
    mockSymbolManager.setup.get.toCallbackWith(null, { some: 'model' });
    client.del('/symbol/LON/VM', (err, req, res) => {
      should.ifError(err);
      should(res.statusCode).eql(204);
      mockSymbolManager.expect.remove.called.once();
      done();
    });
  });

  it('deleting a symbol that doesnt exist should return bad request', (done) => {
    mockSymbolManager.setup.get.toCallbackWith(null, null);
    client.del('/symbol/LON/VM', (err, req, res) => {
      should(err).not.eql(null, 'BadRequest error was not returned');
      should(res.statusCode).eql(400);
      mockSymbolManager.expect.remove.called.never();
      done();
    });
  });

});
