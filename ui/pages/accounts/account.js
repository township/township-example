var html = require('choo/html')
var css = require('sheetify')
var serialize = require('form-serialize')

var login = require('../../elements/login-form')
var logout = require('../../elements/logout-button')

module.exports = function (state, prev, send) {
  var authenticated = state.account.authenticated
  var checkingAuth = state.account.checkingAuth

  if (!checkingAuth) {
    if (!authenticated) {
      send('go', '/')
    } else {
      return html`<div>
        <h1>Your account</h1>


      </div>`
    }
  }
}
