'use strict';

var lodashZip = require('lodash.zip');


/**
 * Fix lodash.zip's non-uniform behavior
 *   when the only array is given or not at all.
 *
 * @examples
 * zip([1, 2, 3], [4, 5, 6]) -> [[1, 4], [2, 5], [3, 6]]
 * zip([1, 2, 3]) -> [[1], [2], [3]]
 * zip() -> null
 */
module.exports = function () {
  if (arguments.length > 1) {
    return lodashZip.apply(null, arguments);
  }
  else if (arguments.length == 1) {
    return arguments[0].map(function (item) {
      return [item];
    });
  }
  else {
    return null;
  }
};
