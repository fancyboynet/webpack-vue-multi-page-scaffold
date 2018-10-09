const request = require('request')
module.exports = function (app) {
  app.use('/api/', function(req, res) {
    let url = `http://10.0.2.121:8090${req.url}`
    req.pipe(request(url)).pipe(res)
  })
}
