'use strict';
let SymbolManager = require('../lib/symbolManager');
let KeyValueStore = require('sn.core').Default.Store;

let should = require('should');

describe('Symbol Manager', () => {
  let store, symbolManager;

  before(() => {
    store = new KeyValueStore('sn:picker:symbols');
    symbolManager = new SymbolManager(store);
  });

  beforeEach(() => {
    store.flush();
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
});
