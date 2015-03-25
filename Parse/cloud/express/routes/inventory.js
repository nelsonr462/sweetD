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
