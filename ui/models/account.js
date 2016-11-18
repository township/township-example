var store = require('store')

module.exports = function (config) {
  var api = require('../../client')(config)

  return {
    namespace: 'account',
    state: {
      checkingAuth: true,
      authenticated: false,
      account: null
    },
    reducers: {
      set: function (state, data) {
        return { authenticated: true, account: data }
      },
      unset: function (state, data) {
        return { authenticated: false, account: null }
      },
      finishAuthCheck: function (state, data) {
        return { checkingAuth: false }
      }
    },
    effects: {
      register: function (state, data, send, done) {
        api.register({
          email: data.email,
          password: data.password
        }, function (err, res, body) {
          if (err) return send('messages:error', err.message, done)
          store.set(config.clientHost, body.token)
          send('account:set', body, function () {
            send('go', '/', done)
          })
        })
      },
      login: function (state, data, send, done) {
        api.login(data, function (err, res, body) {
          if (err) return send('messages:error', err.message, done)

          store.set(config.clientHost, body.token)
          send('account:set', body, function () {
            send('go', '/', done)
          })
        })
      },
      logout: function (state, data, send, done) {
        var token = store.get(config.clientHost)

        api.logout({ token: token }, function (err, res, body) {
          if (err) return send('messages:error', err.message, done)

          store.remove(config.clientHost)
          send('account:unset', function () {
            send('go', '/', done)
          })
        })
      }
    },
    subscriptions: [
      function (send, done) {
        var token = store.get(config.clientHost)
        if (!token) return send('account:finishAuthCheck', done)

        api.login({ token: token }, function (err, res, body) {
          if (err) {
            return send('messages:error', err.message, function () {
              send('account:finishAuthCheck', done)
            })
          }

          send('account:set', body, function () {
            send('account:finishAuthCheck', done)
          })
        })
      }
    ]
  }
}
