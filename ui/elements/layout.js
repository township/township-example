var html = require('choo/html')
var css = require('sheetify')

var header = require('./header')
var messages = require('./messages')
var main = require('./main')

module.exports = function layout (page) {
  return function (state, prev, send) {
    var prefix = css`
      :host {
        height: 100%;
      }
    `

    return html`<div class=${prefix}>
      ${header(state, prev, send)}
      ${messages(state, prev, send)}
      ${main(page(state, prev, send))}
    </div>`
  }
}
