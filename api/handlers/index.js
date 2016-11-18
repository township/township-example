module.exports = function (config) {
  return {
    example: require('./example')(config),
    accounts: require('./accounts')(config)
  }
}
