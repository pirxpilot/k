
/**
 * Module Dependencies.
 */

var proto = require('./proto');
var bind = require('bind');

/**
 * Create a new dispatcher with `el`.
 *
 * example:
 *
 *      var k = require('k')(window);
 *      k('shift + tab', function(){});
 *
 * @param {Element} el
 * @return {Function}
 * @api public
 */

module.exports = function(el){
  function k(e, fn){ k.handle(e, fn); }
  k._handle = bind(k, proto.handle);
  k._clear = bind(k, proto.clear);
  k._reset = bind(k, proto.reset);
  el.addEventListener('keydown', k._handle, false);
  el.addEventListener('keyup', k._handle, false);
  el.addEventListener('keyup', k._clear, false);
  el.addEventListener('focus', k._reset, false);
  for (var p in proto) k[p] = proto[p];
  k.listeners = [];
  k.active = 0;
  k.el = el;
  return k;
};
