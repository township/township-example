var html = require('choo/html')
var css = require('sheetify')
var serialize = require('form-serialize')

var login = require('../elements/login-form')
var logout = require('../elements/logout-button')
var register = require('../elements/register-form')

module.exports = function (state, prev, send) {
  var authenticated = state.account.authenticated

  var prefix = css`
    :host {
      width: 500px;
      margin-bottom: 50px;
      font-size: 24px;
    }
  `

  if (authenticated) {
    return html`<div class="${prefix}">
      <h1>You're in!</h1>
      ${logout(state, prev, send)}
    </div>`
  } else {
    return html`<div class="${prefix}">
      <h1>Welcome to Township</h1>
      <p><a href="/login"> Log in</a> or <a href="/register">register</a> to join the party.</p>
    </div>`
  }
}
