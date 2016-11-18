var assert = require('assert')
var store = require('store')
var api = require('../../client')()

module.exports = function (config) {
  return {
    namespace: 'example',
    state: {
      example: {},
      securedExample: {}
    },
    reducers: {
      setExample: function (state, data) {
        state.example = data
        return state
      },
      setSecuredExample: function (state, data) {
        state.securedExample = data
        return state
      }
    },
    effects: {
      fetchExample: function (state, data, send, done) {
        api.example(function (err, res, body) {
          if (err) return send('messages:error', err.message, done)
          send('example:setExample', body, done)
        })
      },
      fetchSecuredExample: function (state, data, send, done) {
        api.securedExample(function (err, res, body) {
          if (err) return send('messages:error', err.message, done)
          send('example:setSecuredExample', body, done)
        })
      }
    }
  }
}
