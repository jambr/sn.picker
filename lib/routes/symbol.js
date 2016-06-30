'use strict';

function Symbol(controller) {
  this.apply = (server) => {
    server.put('/symbol/:exchange/:symbol', controller.add);
    server.del('/symbol/:exchange/:symbol', controller.del);
  };
  return Object.freeze(this);
}

module.exports = Symbol;
