var html = require('choo/html')
var css = require('sheetify')
var serialize = require('form-serialize')

module.exports = function (state, prev, send) {
  var messages = state.messages.list

  var prefix = css`
    :host {
      top: 20px;
      margin-left: calc(50% - 200px);
      position: fixed;
      width: 400px;
    }

    .message-level-error {
      border-radius: 2px;
      background-color: #FFB7B1;
      padding: 20px;
    }

    h2 {
      margin: 0px;
      font-size: 15px;
      font-weight: 500;
    }

    .close {
      position: absolute;
      top: 5px;
      right: 10px;
    }
  `

  if (messages.length) {
    function close (e) {
      send('messages:clearAll')
    }

    setTimeout(function () {
      close()
    }, 5000)

    function eachMessage (message) {
      var text = html`<h2></h2>`
      text.innerHTML = message.text
      return html`<div class="message message-level-${message.level}">
        <span class="close" onclick=${close}>x</span>
        ${text}
      </div>`
    }
    
    return html`<div class="${prefix} messages-wrapper" onclick=${close}>
      ${messages.map(eachMessage)}
    </div>`
  } else {
    return html`<div></div>`
  }
}
