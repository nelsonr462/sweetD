var Inventory = Parse.Object.extend("inventory")

module.exports.update = function(req, res) {
  var query = new Parse.Query(Inventory)
  var itemType = req.param('itemType')
  var item = req.param('item')
  var change = req.param('changeValue')

  query.equalTo("objectId", req.param("id"))
  query.first({
    success: function( inventory ) {
      inventory.save(null, {
        success: function( inventory ) {
          var current = (inventory.get("remaining") + parseInt(change, 10))
          console.log(current)
          inventory.set("remaining", current)
          inventory.save().then(function() {
            res.successT()
          }, res.errorT)
        }
      })
      console.log("Inventory Updated")
    },
    error: function(object, error) {
      console.log("Inventory Update Failed")
    }
    
  })
  
}

module.exports.request = function(req, res) {
  var id = req.param("id")
  var query = new Parse.Query(Inventory)
  
  query.equalTo("objectId", req.param("id"))
  query.first({
    success: function( inventory ) {
      res.successT({
        remaining: inventory.get("remaining"),
        elementId: inventory.get("elementId")
      })
    }
  })
}


module.exports.getTotal = function(req, res) {
  var order = req.param("order")
  var inventory = req.param("inventory")
  
  var subtotals = []
  var sum = 0;
  var feeflag = false;
  
  for(i = 0; i < order.length; i++){
    if( order[i] == inventory[i] ) {
      subtotals[i] = 0
      continue;
    } else {
    
      var price
      switch( inventory[i] ) {
        case "Chocolate Chip Cookies":
        case "Condoms":
          price = 50;
          break;
        case "Snickers":
          price = 100;
          break;
        case "Rock Star":
        case "Red Bull":
          price = 200;
          break;
      }
      subtotals[i] = parseInt(order[i].charAt(0))*price
      sum = sum + subtotals[i]
    }
  }
  

  if(sum === 0) {
    feeflag = false
  } else if(sum < 500 && sum > 0) {
    feeflag = true
    sum = sum + 300
  }
  
  res.successT({
    sum: sum,
    fee: feeflag
  })
  
  
}

