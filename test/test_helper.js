global.assert = require('assert');
global.I18n   = require('../lib/daplayer-i18n.js');

global.keys = (object, scope, array) => {
  if (!scope) {
    scope = "";
    array = [];
  }

  for (var key in object) {
    if (typeof object[key] == 'object')
      keys(object[key], scope + "." + key, array);
    else
      array.push(scope + "." + key);
  }

  return array;
}
