var client = require('../index')({
  host: 'http://127.0.0.1:3001'
})

var creds = {
  email: 'sethvincent@gmail.com',
  password: 'wutwut'
}

client.register(creds, function (err, res, body) {
  if (err) return console.log(err)

  var opts = {
    token: body.token,
    url: 'http://127.0.0.1:3001/secured',
    json: true
  }

  client.request(opts, function (err, res, body) {
    console.log(err, body)
  })
})
