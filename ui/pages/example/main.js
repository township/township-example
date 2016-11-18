var html = require('choo/html')
var css = require('sheetify')
var serialize = require('form-serialize')

var login = require('../../elements/login-form')
var logout = require('../../elements/logout-button')
var register = require('../../elements/register-form')

module.exports = function (state, prev, send) {
  var authenticated = state.account.authenticated
  console.log('state.example', state.example)
  var prefix = css`
    :host {
      width: 500px;
      margin-bottom: 50px;
      font-size: 24px;
    }
  `

  if (authenticated) {
    return html`<div class="${prefix}">
      <h1>heyo</h1>
    </div>`
  } else {
    return html`<div class="${prefix}">
      <h1>not yet</h1>
    </div>`
  }
}
