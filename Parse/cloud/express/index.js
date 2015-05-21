var express = require('express')
var app = express()
 
// Set Master Key
Parse.Cloud.useMasterKey()

// Routes
  var routes = {
    inventory: require("cloud/express/routes/inventory.js"),
    order: require("cloud/express/routes/order.js"),
    support: require("cloud/express/routes/support.js"),
    test: require("cloud/express/routes/test.js")
  }

// Global app configuration section
app.set('views', 'cloud/express/views')
app.set('view engine', 'ejs')
app.enable('trust proxy')
 
// Configure express routes
app.use(express.bodyParser())
app.use(express.cookieParser())
app.use(express.cookieSession({
  secret: 'ursid',
  cookie: {
      httpOnly: true
  }
}))

app.use(function(req, res, next) {
  res.successT = function(data) {
    data = data || {}
    data.success = true
    res.json(data)
  }

  res.errorT = function(error) {
    error = error.description || error

    res.json({
      success: false,
      status: 1,
      message: error
    })
  }

  res.renderT = function(template, data) {
    data = data || {}
    data.host = req.protocol + "://" + req.host
    data.url = data.host + req.url
    data.template = data.template || template
    data.user = data.user || req.session.user
    data.random = Math.random().toString(36).slice(2)
    res.render(template, data)
  }

  next()
})

// Landings
app.get('/', routes.order.home)
app.get('/thanks', routes.order.thanks)
app.get('/support', routes.support.contact)
app.get('/test',routes.test.test)

// Order Handling
app.post('/order/new', routes.order.newOrder)
app.post('/inventory/update', routes.inventory.update)
app.get('/inventory/request', routes.inventory.request)
app.get('/inventory/getTotal', routes.inventory.getTotal)

// Not Found Redirect
app.all("*", routes.order.notFound)
 
// Listen to Parse
app.listen()