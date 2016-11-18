var send = require('appa/send')
var error = require('appa/error')
var log = require('appa/log')()

module.exports = function (config) {
  var accounts = require('../accounts')()

  return {
    register: register,
    login: login,
    logout: logout,
    resetPassword: resetPassword
  }

  function register (req, res, ctx) {
    if (req.method === 'POST') {
      accounts.register(ctx.body, function (err, account) {
        if (err) return error(403, err.message).pipe(res)
        accounts.setCookie(res, { token: account.token, hostname: config.clientHost })
        send({ token: account.token, key: account.key }).pipe(res)
      })
    } else {
      return error(res, 405, 'Method not allowed')
    }
  }

  function login (req, res, ctx) {
    if (req.method === 'POST') {
      accounts.verify(req, function (err, tokenData) {
        if (!err && tokenData) {
          var newToken = accounts.token.sign({ auth: tokenData.auth, access: tokenData.access })
          accounts.setCookie(res, { token: newToken, hostname: config.clientHost })
          send({ key: tokenData.auth.key, token: newToken }).pipe(res)
        } else if (ctx.body && ctx.body.email && ctx.body.password) {
          accounts.login(ctx.body, function (err, account) {
            if (err) return error(403, err.message).pipe(res)
            accounts.setCookie(res, { token: account.token, hostname: config.clientHost })
            send({ key: account.key, token: account.token }).pipe(res)
          })
        } else {
          if (err) return error(403, err.message).pipe(res)
          return error(403, 'both email and password are required').pipe(res)
        }
      })
    } else {
      error(405, 'Method not allowed').pipe(res)
    }
  }

  function logout (req, res, ctx) {
    if (req.method === 'POST') {
      var token = accounts.getToken(req)
      accounts.logout(token, function (err, account) {
        if (err) return error(403, err.message).pipe(res)
        accounts.removeCookie(res)
        send(200, {}).pipe(res)
      })
    } else {
      error(405, 'Method not allowed').pipe(res)
    }
  }

  function resetPassword (req, res, ctx) {
    if (req.method === 'POST') {
      accounts.resetPassword(ctx.body, function (err, account) {
        if (err) return error(403, err.message).pipe(res)
        send(200, account).pipe(res)
      })
    } else {
      error(405, 'Method not allowed').pipe(res)
    }
  }
}
