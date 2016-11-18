var http = require('http')
var createApp = require('appa')
var corsify = require('corsify')
var config = require('./config')

var app = createApp({
  log: config.log
})

var handlers = require('./handlers')(config)

app.on('/', handlers.example.main)
app.on('/secured', handlers.example.secured)

/* Accounts routes */
app.on('/auth/register', handlers.accounts.register)
app.on('/auth/login', handlers.accounts.login)
app.on('/auth/logout', handlers.accounts.logout)

var cors = corsify({
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': config.clientHost,
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization'
})

http.createServer(cors(app)).listen(3001, function () {
  app.log.info('server started at http://127.0.0.1:3001')
})
