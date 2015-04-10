$(function(){

  var total = "$0.00"
  var tval = 0;
  var pflag = false;
  var lflag = false;
  var inventory = ["Chocolate Chip Cookies", "Red Bull", "Snickers", "Condoms", "Rock Star", "White Chocolate Macadamia Cookies", "Oatmeal Raisin Cookies", "Brownies", "Cinnamon Rolls", "Twix", "Milky Way", "M&M's", "Peanut M&M's"]
  var ids = ["Cw88sZHIZy", "yTFc0JXOV4", "dOWFhzLe0l", "OFlBAvSjpD", "r4aIlTLQ4J", "kDIaQg1oF6", "arhcAs2f1s", "jqlPANiXgo", "NguOjWzDvc", "XZtg1Yebhe", "ZgfMt4Gp0f", "C9IwFUQQOW", "VYrQAhuOwY" ]
  
  // Get inventory numbers
  for(i = 0; i<inventory.length; i++) {
    inventoryCheck(ids[i])
  }
  
  // Order Submission and twilio text pre-formatting
  $(".form").submit(function(event){  // <-   onsubmit
    event.preventDefault()
    event.stopPropagation()
    
    var bad = "<span class=\"glyphicon glyphicon-remove form-control-feedback\" aria-hidden=\"true\" id=\"bad\"></span>"
    var bad2 = "<span class=\"glyphicon glyphicon-remove form-control-feedback\" aria-hidden=\"true\" id=\"bad2\"></span>"

    // User input taken //
    var number = $("#phoneNumber").val()
    var loc = $("#location").val()
    var cookie = $("#chipCookies").val()
    var redBull = "Red Bull"/*$("#redBull").val()*/
    var condom = $("#condoms").val()
    var snickers = $("#snickers").val()
    var rockStar = $("#rockStars").val()
    var whiteChocolate = $("#whiteChocolate").val()
    var oatmeal = $("#oatmeal").val()
    var brownie = $("#brownies").val()
    var cinnaRoll = $("#cinnaRolls").val()
    var twix = $("#twix").val()
    var milkyWay = $("#milkyWay").val()
    var mnms = $("#mnms").val()
    var peanuts = $("#peanuts").val()
    var itemsOrdered = [cookie, redBull, snickers, condom, rockStar, whiteChocolate, oatmeal, brownie, cinnaRoll, twix, milkyWay, mnms, peanuts]
    var list = ""
    
    // Create list string
    for(i = 0; i < inventory.length; i++) {
      if(inventory[i] == itemsOrdered[i]) {
        continue;
      } else {
        list = list+itemsOrdered[i]
        if(i+1 < inventory.length) {
          list = list+", "
        }
      }
    }
    
    // POST order message values and input check
    if( pflag === true && lflag === true && list ) {
      updateInventory(itemsOrdered, inventory)
      $.post("/order/new",
      {
        location: loc,
        orderList: list,
        phoneNumber: number,
        total: total
      },
      
      function() {
        console.log("POST success")
      })
      window.location.replace("http://heysweetd.com/thanks")

    } else if( pflag === false && lflag === false) {
      alert("Please enter a valid phone number and location!")
      $("#bad").remove()
      $("#bad2").remove()
      $("#phoneCheck").addClass("has-error has-feedback")
      $("#phoneCheck").append(bad)
      $("#locationCheck").addClass("has-error has-feedback")
      $("#locationCheck").append(bad2)
    } else if( pflag === false ) {
      alert("Please enter a valid phone number!")
      $("#bad").remove()
      $("#phoneCheck").addClass("has-error has-feedback")
      $("#phoneCheck").append(bad)
    } else if( lflag === false ) {
      alert("Please enter a valid location!")
      $("#bad2").remove()
      $("#locationCheck").addClass("has-error has-feedback")
      $("#locationCheck").append(bad2)
    } else if( !list ) {
      alert("You have no order! Please select items for delivery.")
    }
  })
  
  
  // Dynamic Total Value
  $("select").change(function (){
    
    var cookie = $("#chipCookies").val()
    var redBull = "Red Bull"/*$("#redBull").val()*/
    var condom = $("#condoms").val()
    var snickers = $("#snickers").val()
    var rockStar = $("#rockStars").val()
    var whiteChocolate = $("#whiteChocolate").val()
    var oatmeal = $("#oatmeal").val()
    var brownie = $("#brownies").val()
    var cinnaRoll = $("#cinnaRolls").val()
    var twix = $("#twix").val()
    var milkyWay = $("#milkyWay").val()
    var mnms = $("#mnms").val()
    var peanuts = $("#peanuts").val()
    
    var itemsOrdered = [cookie, redBull, snickers, condom, rockStar, whiteChocolate, oatmeal, brownie, cinnaRoll, twix, milkyWay, mnms, peanuts]
    var fee = "<p id=\"deliveryFee\" style=\"margin-bottom: 20px;\">Delivery fee: <r>$3.00</r></p>"

    
    getTotal(itemsOrdered, inventory)
    
    if(total != "$0.00") {
      if(tval < 500) {
        addFee(tval);
        $("#deliveryFee").remove()
        $("#totalText").text("Total: ")
        $("#totalText").append("<r>"+total+"</r>")
        $("#totalText").after(fee)
      } else {
        $("#deliveryFee").remove()
        $("#totalText").text("Total: ")
        $("#totalText").append("<green>"+total+"</green>")
      }
    } else {
      $("#deliveryFee").remove()
      $("#totalText").text("Total: " + total)

    }
    animate()
  })
  
  // Phone number validity check
  $('#phoneNumber').change(function() {
    
    var number = $("#phoneNumber").val()
    var good = "<span class=\"glyphicon glyphicon-ok form-control-feedback\" aria-hidden=\"true\" id=\"good\"></span>"
    var bad = "<span class=\"glyphicon glyphicon-remove form-control-feedback\" aria-hidden=\"true\" id=\"bad\"></span>"
    
    var check = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
    
    if(check.test(number)) {
      $("#phoneCheck").removeClass("has-error has-feedback")
      $("#bad").remove()
      $("#good").remove()
      $("#phoneCheck").addClass("has-success has-feedback")
      $("#phoneCheck").append(good)
      pflag = true
    } else {
      $("#phoneCheck").removeClass("has-success has-feedback")
      $("#bad").remove()
      $("#good").remove()
      $("#phoneCheck").addClass("has-error has-feedback")
      $("#phoneCheck").append(bad)
      pflag = false
      
    }
    
  })
  
  // Location input check
  $('#location').change(function() {
    var location = $("#location").val()
    var good2 = "<span class=\"glyphicon glyphicon-ok form-control-feedback\" aria-hidden=\"true\" id=\"good2\"></span>"
    var bad2 = "<span class=\"glyphicon glyphicon-remove form-control-feedback\" aria-hidden=\"true\" id=\"bad2\"></span>"
    
    var check = /^(?!\s*$).+/
    
    if( check.test(location) ) {
      $("#locationCheck").removeClass("has-error has-feedback")
      $("#bad2").remove()
      $("#good2").remove()
      $("#locationCheck").addClass("has-success has-feedback")
      $("#locationCheck").append(good2)
      lflag = true
    } else {
      $("#locationCheck").removeClass("has-success has-feedback")
      $("#bad2").remove()
      $("#good2").remove()
      $("#locationCheck").addClass("has-error has-feedback")
      $("#locationCheck").append(bad2)
      lflag = false
    }
  })
  
  // Total Calculation
  function getTotal( order, inventory ) {
    var subtotals = []
    var sum = 0;
    
    for(i = 0; i < order.length; i++){
      if( order[i] == inventory[i] ) {
        subtotals[i] = 0
        continue;
      } else {
      
        var price
        switch( inventory[i] ) {
          case "Oatmeal Raisin Cookies":
          case "White Chocolate Macadamia Cookies":
          case "Chocolate Chip Cookies":
          case "Condoms":
          case "Brownies":
          case "Cinnamon Rolls":
            price = 50;
            break;
          case "Snickers":
          case "Twix":
          case "Milky Way":
          case "M&M's":
          case "Peanut M&M's":
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
    
    tval = sum
    var tstring = sum.toString()


    if(sum >= 1000) {
      total = "$" + tstring.substr(0,2) + "." + tstring.substr(2)
    } else if(sum == 0) {
      total = "$0.00"
    }  else if( sum < 100 ) {
      total = "$0." + tstring
    } else {
      total = "$" + tstring.substr(0,1) + "." + tstring.substr(1)
    }
    
    return
    
  }
  
  // Update inventory
  function updateInventory( order, inventory ) {
    var changeValue = []
    var itemType = []
    var id = []
    
    
    for(i = 0; i < order.length; i++){
      if( order[i] == inventory[i] ) {
        continue;
      } else {
        changeValue[i] = parseInt(order[i].charAt(0)*-1)
        switch(inventory[i]) {
          case "Chocolate Chip Cookies":
            itemType[i] = "Cookie";
            id[i] = "Cw88sZHIZy"
            break;
          case "Condoms":
            itemType[i] = "Condom";
            id[i] = "OFlBAvSjpD"
            break;
          case "Red Bull":
            itemType[i] = "Drink";
            id[i] = "yTFc0JXOV4"
            break;
          case "Snickers":
            itemType[i] = "Candy";
            id[i] = "dOWFhzLe0l"
            break;
          case "Rock Star":
            itemType[i] = "Drink";
            id[i] = "r4aIlTLQ4J"
            break;
          case "White Chocolate Macadamia Cookies":
            itemType[i] = "Cookie";
            id[i] = "kDIaQg1oF6"
            break;
          case "Oatmeal Raisin Cookies":
            itemType[i] = "Cookie"
            id[i] = "arhcAs2f1s"
            break;
          case "Brownies":
            itemType[i] = "Mini"
            id[i] = "jqlPANiXgo"
            break;
          case "Cinnamon Rolls":
            itemType[i] = "Mini"
            id[i] = "NguOjWzDvc"
            break;
          case "Twix":
            itemType[i] = "Candy"
            id[i] = "XZtg1Yebhe"
            break;
          case "Milky Way":
            itemType[i] = "Candy"
            id[i] = "ZgfMt4Gp0f"
            break;
          case "M&M's":
            itemType[i] = "Candy"
            id[i] = "C9IwFUQQOW"
            break;
          case "Peanut M&M's":
            itemType[i] = "Candy"
            id[i] = "VYrQAhuOwY"
            break;
        }
        
        $.post("/inventory/update",
        {
          itemType: itemType[i],
          item: inventory[i],
          changeValue: changeValue[i],
          id: id[i],
        },
        
        function() {
          console.log("Inventory Updated")
        })
        
      }
      
    }
  }
  
  // Get inventory numbers
  function inventoryCheck( id ) {
    var str = " left!)</r>"
    var d
    var label = "#"+id
    var element = ""
    $.get("/inventory/request", {id: id}, function(data){
      d = data.remaining
      element = element + data.elementId
      switch(d) {
        case 8:
          str = "<r> (8"+str;
          $(label).append(str)
          break;
        case 7:
          str = "<r> (7"+str;
          $(label).append(str)
          break;
        case 6:
          str = "<r> (6"+str;
          $(label).append(str)
          break;
        case 5:
          str = "<r> (5"+str;
          $(label).append(str)
          break;
        case 4:
          str = "<r> (4"+str;
          $(label).append(str)
          break;
        case 3:
          str = "<r> (3"+str;
          $(label).append(str)
          break;
        case 2:
          str = "<r> (2"+str;
          $(label).append(str)
          break;
        case 1:
          str = "<r> (1"+str;
          $(label).append(str)
          break;
        case 0:
          str = "<r> (all gone!)</r>"
          $(label).append(str)
          $(element).attr( "disabled", "disabled")
          break;
      }
    })
  }
  
  function animate() {
    $('#totalText').addClass('pulse animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).removeClass('pulse animated');
    });
  }
  
  function addFee( value ) {
    value = value + 300;
    var tstring = value.toString()
    total = "$" + tstring.substr(0,1) + "." + tstring.substr(1)
  }
  
})