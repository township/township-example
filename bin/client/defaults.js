module.exports = function defaults (config) {
  var server

  if (config.currentLogin) {
    server = config.currentLogin.server
  } else {
    server = 'https://127.0.0.1:3001'
  }

  return [{
    name: 'server',
    abbr: 's',
    default: server,
    help: 'The server that hosts your api'
  }]
}
