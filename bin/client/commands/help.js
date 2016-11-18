var usage = `
  USAGE:
    township-example {command} [options]
  COMMANDS:
    register,  create a new account
    login,     log in
    logout,    log out
    password,  change your password
    help,      show this help message
`

module.exports = {
  name: 'help',
  command: function help () {
    console.log(usage)
  }
}
