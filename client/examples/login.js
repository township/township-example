var client = require('../index')({
  host: 'http://127.0.0.1:3001'
})

var creds = {
  email: 'sethvincent@gmail.com',
  password: 'wutwut'
}

client.login(creds, function (err, res, body) {
  console.log(err, body)
})
