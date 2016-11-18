var path = require('path')
var xtend = require('xtend')

var config = {
  shared: {
    title: 'Township Example',
    host: 'http://127.0.0.1',
    port: 3322,
    clientHost: 'http://127.0.0.1:9966',
    secret: 'this is not very secret',
    dbDir: path.join(__dirname, 'db'),
    debug: true,
    email: {
      fromEmail: 'hi@example.com',
      postmarkAPIKey: 'your api key'
    },
    requiredScopes: {},
    exampleScope: 'example:read'
  },
  production: {
    secret: process.env.TOWNSHIP_SECRET,
    debug: false,
    dbDir: path.join(__dirname, 'db'),
    email: {
      fromEmail: 'hi@example.com',
      postmarkAPIKey: 'your api key'
    },
    requiredScopes: {}
  }
}

var env = process.env.NODE_ENV || 'development'
module.exports = xtend(config.shared, config[env])
