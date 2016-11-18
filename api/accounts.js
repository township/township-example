var accounts = require('township-accounts')
var config = require('./config')
var maindb = require('./lib/db')({ dbDir: config.dbDir })

module.exports = function () {
  config.name = 'township-example'
  return accounts(maindb, config)
}
