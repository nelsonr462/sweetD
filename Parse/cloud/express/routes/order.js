var Order = Parse.Object.extend("order")
var client = require('twilio')('AC24813c0f78b7bcccc83798096e0d9cdc', '085fc22c253b33d693af8046d6c64007')


module.exports.home = function(req, res) {
  // Render home (order) page
  res.renderT('home/order', {
      template: 'home/order',
    }
  )
}

module.exports.newOrder = function(req, res) {

  var order = new Order();
  
  order.set("Location", req.param('location'))
  order.set("productOrdered", req.param('orderList'))
  order.set("customerPhone", req.param('phoneNumber'))
  
  order.save().then(function() {

    res.successT()
  }, res.errorT)

  var location = req.param('location')
  var productOrdered = req.param('orderList')
  var cstmerNumber = req.param('phoneNumber')
  
  if(location && productOrdered && cstmerNumber) {
    client.sendSms({
      to: '+16507841467',
      from: '+16508661029',
      body: 'New order: '+productOrdered+'. Location: '+location+'. Customer number: '+cstmerNumber,
    }, function(err, responseData){
      if(err) {
        console.log(err)
      } else {
        console.log(responseData.from);
        console.log(responseData.body);
      }
    }
    
    )
  }
  
}