var html = require('choo/html')
var css = require('sheetify')
var serialize = require('form-serialize')

var login = require('../../elements/login-form')
var logout = require('../../elements/logout-button')

module.exports = function (state, prev, send) {
  var authenticated = state.account.authenticated
  var checkingAuth = state.account.checkingAuth

  if (!checkingAuth) {
    if (authenticated) {
      send('go', '/')
      return html`<div></div>`
    } else {
      return html`<div>
        <h1>Log in</h1>
        ${login(state, prev, send)}
      </div>`
    }
  } else {
    return html`<div></div>`
  }
}
