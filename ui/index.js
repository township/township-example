var choo = require('choo')
var html = require('choo/html')

var layout = require('./elements/layout')
var secure = require('./elements/layout-secure')

var app = choo()

app.model(require('./models/app')({}))
app.model(require('./models/account')({}))
app.model(require('./models/messages')({}))
app.model(require('./models/example')({}))

app.router({ default: '/'}, [
  ['/', secure(require('./pages/main'))],
  ['/login', layout(require('./pages/accounts/login'))],
  ['/register', layout(require('./pages/accounts/register'))],
  ['/example', layout(require('./pages/example/main'))],
  ['/example-secured', secure(require('./pages/example/secured'))]
])

var tree = app.start()
document.body.appendChild(tree)
