var html = require('choo/html')
var css = require('sheetify')

module.exports = function (page) {
  var prefix = css`
    :host {
      height: 100%;
    }

    h1 {
      font-weight: 300;
    }
  `

  return html`<main class="${prefix} site-main">
    <div class="container">
      ${page}
    </div>
  </main>`
}
