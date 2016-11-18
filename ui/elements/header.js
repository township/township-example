var html = require('choo/html')
var css = require('sheetify')

var logout = require('./logout-button')

module.exports = function (state, prev, send) {
  var authenticated = state.account.authenticated
  var checkingAuth = state.account.checkingAuth

  var prefix = css`
    :host {
      
    }

    h1 {
      margin: 15px 0px;
      font-weight: 300;
      font-size: 14px;
      display: inline-block;
    }

    h1 a {
      color: #666;
      text-decoration: none;
    }

    h1 a:hover {
      color: #222;
      text-decoration: none;
    }

    .header-links {
      font-size: 14px;
      float: right;
      margin: 15px 0px;
    }
  `

  var accountLinks
  if (!checkingAuth) {
    if (authenticated) {
      accountLinks = logout(state, prev, send)
    } else {
      accountLinks = html`<span><a href="/login">log in</a>
      <a href="/register">create your account</a></span>`
    }  
  }

  return html`<header class="${prefix} site-header">
    <div class="container">
      <h1><a href="/">township</a></h1>
      <div class="header-links">
      <a href="/example" target="_blank">example</a>
      <a href="/secured-example" target="_blank">secured example</a>
      ${accountLinks}
      </div>
    </div>
  </header>`
}
