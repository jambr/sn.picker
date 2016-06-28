'use strict';
class SymbolManager {
  constructor(store) {
    this.store = store;
  }

  add(exchange, symbol, done) {
    this.store.set(`${exchange}:${symbol}`, {
      exchange: exchange,
      symbol: symbol
    }, done);
  }

  get(exchange, symbol, done) {
    this.store.get(`${exchange}:${symbol}`, done);
  }

  remove(exchange, symbol, done) {
    this.store.remove(`${exchange}:${symbol}`, done);
  }
}

module.exports = SymbolManager;
