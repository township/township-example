var qs = require('querystring')
var req = require('request')

module.exports = function createAPIClient (config) {
  config = config || {}
  var host = config.host || 'http://127.0.0.1:3001'
  var api = {}

  /*
  * EXAMPLE
  */
  api.example = function api_example_fetch (callback) {
    return request({
      url: host + '/',
      json: true
    }, callback)
  }

  api.securedExample = function api_example_secured (callback) {
    return request({
      url: host + '/secured',
      json: true
    }, callback)
  }

  api.register = function api_account_register (opts, callback) {
    return request({
      url: host + '/auth/register',
      method: 'POST',
      json: opts,
    }, function (err, res, body) {
      if (err) return callback(err)
      config.token = body.token
      callback(null, res, body)
    })
  }

  api.login = function api_account_login (opts, callback) {
    return request({
      url: host + '/auth/login',
      method: 'POST',
      json: opts,
      token: opts.token
    }, function (err, res, body) {
      if (err) return callback(err)
      config.token = body.token
      callback(null, res, body)
    })
  }

  api.logout = function api_account_logout (opts, callback) {
    return request({
      url: host + '/auth/logout',
      method: 'POST',
      json: true,
      token: opts.token
    }, callback)
  }

  api.cancel = function api_account_cancel (key, callback) {
    return request({
      url: host + '/auth/logout',
      method: 'POST',
      json: true
    }, callback)
  }

  function request (opts, callback) {
    config.token = config.token || opts.token
    if (config.token) opts.withCredentials = true
    if (config.token || opts.token) opts.headers = { authorization: `Bearer ${config.token || opts.token}` }

    return req(opts, function (err, res, body) {
      if (err) return callback(err)
      if (res.statusCode >= 400) return callback(body)
      return callback(null, res, body)
    })
  }

  api.request = request
  return api
}
