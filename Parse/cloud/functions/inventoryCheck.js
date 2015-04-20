var Inventory = Parse.Object.extend("inventory")
var InventoryCheck = Parse.Object.extend("inventoryCheck")

Parse.Cloud.afterSave("inventory", function(req, res) {
  Parse.Cloud.useMasterKey()
  var getList = new Parse.Query("inventoryCheck")
  var currentInventory = getList.get("D5XSsNASeq")
  var newInventory = []
  var i = 0
  
  var query = new Parse.Query("inventory")
  query.each(function(inventory) {
    newInventory[i] = inventory
  })
})