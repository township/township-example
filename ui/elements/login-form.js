var html = require('choo/html')
var css = require('sheetify')
var serialize = require('form-serialize')

module.exports = function (state, prev, send) {
  var prefix = css`
    :host {}
  `

  function onsubmit (e) {
    e.preventDefault()
    var form = e.target
    var data = serialize(form, { hash: true })
    send('account:login', data)
  }

  return html`<div class="${prefix} form-block">
    <form action="" method="POST" id="payment-form" onsubmit=${onsubmit}>
      <span class="payment-errors"></span>

      <div class="form-row">
        <label>
          <span>Email</span><br>
          <input type="text" size="20" class="form-text-input full-width" name="email" value="sethvincent@gmail.com">
        </label>
      </div>

      <div class="form-row">
        <label>
          <span>Password</span><br>
          <input type="password" size="20" class="form-text-input full-width" name="password" value="test">
        </label>
      </div>

      <input type="submit" class="form-submit" value="Log in">
    </form>
  </div>`
}
