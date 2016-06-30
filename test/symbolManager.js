'use strict';
let SymbolManager = require('../lib/symbolManager');
let KeyValueStore = require('sn.core').Default.Store;
let Broker = require('sn.core').Default.Broker;

let should = require('should');

describe('Symbol Manager', () => {
  let store, symbolManager, broker;
  before(() => {
    store = new KeyValueStore('sn:picker:symbols');
    broker = new Broker('sn:picker:testing');
    symbolManager = new SymbolManager(store, broker);
  });

  beforeEach(done => {
    store.flush();
    broker.reset(done);
  });

  afterEach(done => {
    broker.reset(done);
  });

  it('Should add symbols', (done) => {
    let symbolRead = (err, item) => {
      should(item.exchange).eql('LON');
      should(item.symbol).eql('VM');
      done();
    };

    let symbolAdded = (err) => {
      should.ifError(err);
      symbolManager.get('LON', 'VM', symbolRead);
    };

    symbolManager.add('LON', 'VM', symbolAdded);
  });

  it('Should not add symbols which are already added', (done) => {
    let symbolAdded = (err) => {
      should.ifError(err);
      symbolManager.add('LON', 'VM', (err) => {
        should(err).not.eql(null);
        done();
      });
    };

    symbolManager.add('LON', 'VM', symbolAdded);
  });

  it('Should remove symbols', (done) => {
    let validateItDoesntExist = (err) => {
      should.ifError(err);
      symbolManager.get('LON', 'VM', (err, item) => {
        should(item).eql(null);
        done();
      });
    };

    let nowRemoveIt = (err) => {
      should.ifError(err);
      symbolManager.remove('LON', 'VM', validateItDoesntExist); 
    };

    symbolManager.add('LON', 'VM', nowRemoveIt);
  });

  describe('Messaging', () => {
    it('Should publish a message on adding a symbol', (done) => {
      // Setup a queue which subscribes to the messages
      broker.subscribe('sn.picker.symbol.create', (message) => {
        message.exchange.should.eql('LON');
        message.symbol.should.eql('VM');
        done();
      }, () => { 
        symbolManager.add('LON', 'VM', () => {});
      });
    });
    it('Should publish a message on deleting a symbol', (done) => {
      // Setup a queue which subscribes to the messages
      broker.subscribe('sn.picker.symbol.delete', (message) => {
        message.should.eql('LON:VM');
        done();
      }, () => { 
        symbolManager.remove('LON', 'VM', () => {});
      });
    });
  });

});
