#! /usr/bin/env node

var subcommand = require('subcommand')
var config = require('../lib/config')()
config.init()

var match = subcommand({
  defaults: require('./defaults')(config.read()),
  commands: [
    require('./commands/login'),
    require('./commands/logout'),
    require('./commands/register'),
    require('./commands/help')
  ]
})

match(process.argv.slice(2))
