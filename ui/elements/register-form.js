var html = require('choo/html')
var css = require('sheetify')
var serialize = require('form-serialize')

module.exports = function (state, prev, send) {
  var prefix = css`
    :host {
      
    }
  `

  function onsubmit (e) {
    e.preventDefault()
    var form = e.target
    var data = serialize(form, { hash: true })
    data.form = form
    send('account:register', data)
  }

  return html`<div class="${prefix} form-block">
    <form action="" method="POST" id="payment-form" onsubmit=${onsubmit}>
      <span class="payment-errors"></span>

      <div class="form-row">
        <label>
          <span>Email</span><br>
          <input type="text" name="email" class="form-text-input full-width" value="sethvincent@gmail.com">
        </label>
      </div>

      <div class="form-row">
        <label>
          <span>Password</span><br>
          <input type="password" class="form-text-input full-width" name="password" value="test">
        </label>
      </div>

      <input type="submit" class="form-submit" value="Create your account">
    </form>
  </div>`
}
