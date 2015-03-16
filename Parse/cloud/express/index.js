var express = require('express')
var app = express()
 
// Set Master Key
Parse.Cloud.useMasterKey()

// Routes
/*  var routes = {
    core: require("cloud/express/routes/index.js"),
    workers: require("cloud/express/routes/workers.js"),
    orders: require("cloud/express/routes/orders.js"),
    accounts: require("cloud/express/routes/accounts.js")
  } */

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

// Not Found Redirect
//app.all("*", routes.core.notfound)
 
// Listen to Parse
app.listen()