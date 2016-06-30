'use strict';
function SymbolModel(exchange, symbol) {
  return Object.freeze({
    id: `${exchange}:${symbol}`,
    exchange: exchange, 
    symbol: symbol
  });
}

function SymbolManager(store, broker) {
  this.get = (e, s, done) => {
    let symbol = new SymbolModel(e, s);
    store.get(symbol.id, done);
  };

  this.add = (e, s, done) => {
    let symbol = new SymbolModel(e, s);
    store.set(symbol.id, symbol, (err) => {
      if(err) { return done(err); }
      broker.publish('sn.picker.symbol.create', symbol, done);
    });
  };

  this.remove = (e, s, done) => {
    let symbol = new SymbolModel(e, s);
    store.remove(symbol.id, (err) => {
      if(err) { return done(err); }
      broker.publish('sn.picker.symbol.delete', symbol, done);
    });
  };

  return Object.freeze(this);
}

module.exports = SymbolManager;
