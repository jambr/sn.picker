'use strict';

function Symbol(controller) {
  this.apply = (server) => {
    server.put('/symbol/:exchange/:symbol', controller.add);
  };
  return Object.freeze(this);
}

module.exports = Symbol;
