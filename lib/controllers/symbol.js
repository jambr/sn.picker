'use strict';
let debug = require('debug')('sn:picker:route:symbol');
function Symbol(symbolManager) {
  this.add = (req, res, next) => {
    debug('handling add request');
    symbolManager.add(req.params.exchange, req.params.id, () => {
      res.send('');
    });
    return next();
  };
  return Object.freeze(this);
}

module.exports = Symbol;
