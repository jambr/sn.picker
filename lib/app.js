'use strict';
let Server = require('sn.core').Server;
let Routes = require('./routes');
let Controllers = require('./controllers');

function App(port, symbolManager) {
  let server = new Server(port);
  this.start = server.start;
  this.stop = server.stop;

  let symbolController = new Controllers.Symbol(symbolManager);
  let symbolRoute = new Routes.Symbol(symbolController); 
  server.applyRoute(symbolRoute);  

  return Object.freeze(this);
}
module.exports = App;
