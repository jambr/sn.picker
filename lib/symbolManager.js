'use strict';
function SymbolModel(exchange, symbol) {
  return Object.freeze({
    id: `${exchange}:${symbol}`,
    exchange: exchange, 
    symbol: symbol
  });
}

function SymbolManager(store, broker) {
  this.add = (e, s, done) => {
    let symbol = new SymbolModel(e, s);
    store.set(symbol.id, symbol, (err) => {
      if(err) { return done(err); }
      broker.publish('sn.picker.symbol.create', symbol, done);
    });
  };

  this.get = (exchange, symbol, done) => {
    store.get(`${exchange}:${symbol}`, done);
  };

  this.remove = (e, s, done) => {
    let symbol = new SymbolModel(e, s);
    store.remove(symbol.id, (err) => {
      if(err) { return done(err); }
      broker.publish('sn.picker.symbol.delete', symbol.id, done);
    });
  };

  return Object.freeze(this);
}

module.exports = SymbolManager;
