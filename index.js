'use strict';
let App = require('./lib/app');
let SymbolManager = require('./lib/symbolManager');
let KeyValueStore = require('sn.core').Default.Store;
let Broker = require('sn.core').Default.Broker;

let store, symbolManager, broker, app;
let config = require('./config');

store = new KeyValueStore('sn:picker:symbols', config.redis);
broker = new Broker('sn:topic', config.rabbitmq);
symbolManager = new SymbolManager(store, broker);
app = new App(8001, symbolManager);

app.start(() => {
  console.log('sn.picker started');
});
