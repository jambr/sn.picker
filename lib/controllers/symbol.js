'use strict';
let debug = require('debug')('sn:picker:route:symbol');

function Symbol(symbolManager) {

  this.add = (req, res, next) => {
    debug('handling add request');
    symbolManager.get(req.params.exchange, req.params.symbol, (err, thing) => {
      if(thing) { 
        res.send(304);
      } else {
        symbolManager.add(req.params.exchange, req.params.symbol, () => {
          res.send(201);
        });
      }
      return next();
    });
  };

  this.del = (req, res, next) => {
    debug('handling delete request');
    symbolManager.get(req.params.exchange, req.params.symbol, (err, thing) => {
      if(thing === undefined) {
        res.send(400);
      } else {
        symbolManager.remove(req.params.exchange, req.params.symbol, () => {
          res.send(204);
        });
      }
      return next();
    });
  };

  return Object.freeze(this);
}

module.exports = Symbol;
