var html = require('choo/html')
var css = require('sheetify')
var serialize = require('form-serialize')

var register = require('../../elements/register-form')
var logout = require('../../elements/logout-button')

module.exports = function (state, prev, send) {
  var authenticated = state.account.authenticated

  if (authenticated) {
    return logout(state, prev, send)
  } else {
    return html`<div>
      <h1>Create your account</h1>
      ${register(state, prev, send)}
    </div>`
  }
}
