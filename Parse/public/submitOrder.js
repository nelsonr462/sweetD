$(function(){

  var total = "$0.00"
  var pflag = false;
  var lflag = false;
  
  // Testing time variable
  function checkTime() {
    var d = new Date()
    var hours = d.getHours()
    var mins = d.getMinutes()
    var day = d.getDay()
    console.log(d)
    
    return hours >= 21 && hours <= 1
    
  }
  
  var time = checkTime()
  if(time === false) {
    console.log("closed")
  }
  
  // Order Submission and twilio text pre-formatting
  $(".form").submit(function(event){  // <-   onsubmit
    event.preventDefault()
    event.stopPropagation()
    
    var items = ["Chocolate Chip Cookies", "Red Bull", "Condoms"]
    var bad = "<span class=\"glyphicon glyphicon-remove form-control-feedback\" aria-hidden=\"true\" id=\"bad\"></span>"
    var bad2 = "<span class=\"glyphicon glyphicon-remove form-control-feedback\" aria-hidden=\"true\" id=\"bad2\"></span>"



    // User input taken //
    var number = $("#phoneNumber").val()
    var loc = $("#location").val()
    var cookie = $("#chipCookies").val()
    var redBull = $("#redBull").val()
    var condom = $("#condoms").val()
    var itemsOrdered = [cookie, redBull, condom]
    var list = ""
    
    // Create list string
    for(i = 0; i < items.length; i++) {
      if(items[i] == itemsOrdered[i]) {
        continue;
      } else {
        list = list+itemsOrdered[i]
        if(i+1 < items.length) {
          list = list+", "
        }
      }
    }
    
    // POST order message values and input check
    console.log(list)
    console.log("customer number: " + number)
    
    if( pflag === true && lflag === true && list ) {
      $.post("/order/new",
      {
        location: loc,
        orderList: list,
        phoneNumber: number
      },
      
      function() {
        console.log("POST success")
      })
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
    var redBull = $("#redBull").val()
    var condom = $("#condoms").val()
    
    var inventory = ["Chocolate Chip Cookies", "Red Bull", "Condoms"]
    var itemsOrdered = [cookie, redBull, condom]
    
    getTotal(itemsOrdered, inventory)
    
    $("#totalText").text("Total: " + total)
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
    var good = "<span class=\"glyphicon glyphicon-ok form-control-feedback\" aria-hidden=\"true\" id=\"good2\"></span>"
    var bad = "<span class=\"glyphicon glyphicon-remove form-control-feedback\" aria-hidden=\"true\" id=\"bad2\"></span>"
    
    var check = /^(?!\s*$).+/
    
    if( check.test(location) ) {
      $("#locationCheck").removeClass("has-error has-feedback")
      $("#bad2").remove()
      $("#good2").remove()
      $("#locationCheck").addClass("has-success has-feedback")
      $("#locationCheck").append(good)
      lflag = true
    } else {
      $("#locationCheck").removeClass("has-success has-feedback")
      $("#bad2").remove()
      $("#good2").remove()
      $("#locationCheck").addClass("has-error has-feedback")
      $("#locationCheck").append(bad)
      lflag = false
    }
  })
  
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
          case "Chocolate Chip Cookies":
          case "Condoms":
            price = 50;
            break;
          case "Red Bull":
            price = 200;
            break;
        }
        subtotals[i] = parseInt(order[i].charAt(0))*price
        sum = sum + subtotals[i]
      }
    }
    
    var tstring = sum.toString()
    if(sum >= 1000) {
      total = "$" + tstring.substr(0,2) + "." + tstring.substr(2)
    } else if( sum < 100 ) {
      total = "$0." + tstring
    } else {
      total = "$" + tstring.substr(0,1) + "." + tstring.substr(1)
    }
    
    return
    
  }
  
  
})