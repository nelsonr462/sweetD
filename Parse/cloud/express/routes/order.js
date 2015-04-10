var Order = Parse.Object.extend("order")
var client = require('twilio')('AC24813c0f78b7bcccc83798096e0d9cdc', '085fc22c253b33d693af8046d6c64007');


module.exports.tempo = function(req, res) {
  res.renderT('home/order', {
      template: 'home/order',
    }
  )
}

module.exports.home = function(req, res) {
  
  function checkTime() {
    var d = new Date()
    var hours = d.getHours()
    var mins = d.getMinutes()
    var day = d.getDay()
    // +1 day +7 hour shift as of 3/25/2015
    return day >= 5
      && (day <= 6 || day === 0 || day === 1)
      && hours >= 3
      && ((hours <= 6 && day === (5 || 1)) || (hours <= 8 && day === (6 || 0)))
  }
  
  // Hours of operation
  var time = checkTime()
  if(time === false) {
  res.renderT('home/closed', {
      template: 'home/closed',
    }
  )
    console.log("closed")
  } else {
    // Render home (order) page
    res.renderT('home/order', {
        template: 'home/order',
      }
    )
  }
}

module.exports.thanks = function(req, res) {
    res.renderT('home/complete', {
      template: 'home/complete',
    }
  )
}

module.exports.notFound = function(req, res) {
  res.redirect("/")
}

module.exports.newOrder = function(req, res) {

  var order = new Order();
  var numbers = ['+16507841467', '+16502188830', '+16507843707', '+16502705079', '+13107038176']
  
  order.set("Location", req.param('location'))
  order.set("productOrdered", req.param('orderList'))
  order.set("customerPhone", req.param('phoneNumber'))
  order.set("Total", req.param('total'))
  order.set("Status", "Pending")
  
  order.save().then(function() {
    res.successT()
  }, res.errorT)

  var location = req.param('location')
  var productOrdered = req.param('orderList')
  var cstmerNumber = req.param('phoneNumber')
  var total = req.param('total')
  
  if(location && productOrdered && cstmerNumber && total) {
    
    for(i = 0; i < numbers.length; i++) {
      client.sendSms({
        to: numbers[i],
        from: '+16508661029',
        body: 'New order: '+productOrdered+'\n Location: '+location+'\n Total: '+total+'\n Customer number: '+cstmerNumber,
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
  
}


// To be fixed later..
/* module.exports.update = function(req, res) {
  res.renderT('home/update', {
      template: 'home/update',
    }
  )
  var order = new Order()
  order.id = req.param("order")
  if(order.status == "Pending") {
    order.set("status", req.param("status"))
    order.save().then(function() {
      res.redirect("/updated")
    })
  } else {
    res.redirect("/")
  }
} */