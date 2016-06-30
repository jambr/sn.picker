'use strict';
let App = require('./lib/app');
let SymbolManager = require('./lib/symbolManager');
let KeyValueStore = require('sn.core').Default.Store;
let Broker = require('sn.core').Default.Broker;

let store, symbolManager, broker, app;
store = new KeyValueStore('sn:picker:symbols');
broker = new Broker('sn:picker');
symbolManager = new SymbolManager(store, broker);
app = new App(8001, symbolManager);

app.start(() => {
  console.log('sn.picker started');
});
