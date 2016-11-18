var send = require('appa/send')
var error = require('appa/error')
var log = require('appa/log')()

var accounts = require('../accounts')()

module.exports = function (options) {
  return {
    main: main,
    secured: secured
  }

  function main (req, res, ctx) {
    send({ msg: 'hi' }).pipe(res)
  }

  function secured (req, res, ctx) {
    accounts.verifyToken(req, function (err, token) {
      if (err) return error(res, 403, 'Forbidden')
      send({ msg: 'ok' }).pipe(res)
    })
  }
}
