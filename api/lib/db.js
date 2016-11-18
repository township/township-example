var path = require('path')
var level = require('level-party')

module.exports = function (opts) {
  var dbDir = opts.dbDir || path.join(__dirname, 'db')
  return level(dbDir)
}
