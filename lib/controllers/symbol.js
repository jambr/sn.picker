'use strict';
let debug = require('debug')('sn:picker:route:symbol');
function Symbol(symbolManager) {
  this.add = (req, res, next) => {
    debug('handling add request');
    symbolManager.add(req.params.exchange, req.params.id, () => {
      res.send(201, '');
    });
    return next();
  };
  this.del = (req, res, next) => {
    debug('handling add request');
    symbolManager.remove(req.params.exchange, req.params.id, () => {
      res.send(204, '');
    });
    return next();
  };

  return Object.freeze(this);
}

module.exports = Symbol;
