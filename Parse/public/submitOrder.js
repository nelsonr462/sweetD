$(function(){                          //<- equivalent to attribute
  
  var total = "$0.00"

  $(".form").submit(function(event){  // <-   onsubmit="convert()"
      event.preventDefault();
      event.stopPropagation();
      
      var items = ["Chocolate Chip Cookies", "Red Bull", "Condoms"];

      // User input taken //
      var number = $("#phoneNumber").val();      // <- equivalent to elementbyid(id).value
      var loc = $("#location").val();
      var cookie = $("#chipCookies").val();
      var redBull = $("#redBull").val();
      var condom = $("#condoms").val();
      
      var itemsOrdered = [cookie, redBull, condom];
      var list = "";
      
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
      
      
      if(cookie == "Chocolate Chip Cookies") {
        cookie = "0";
      }
      
      if(redBull == "Red Bull") {
        redBull = "0";
      }
      
      if(condom == "Condoms") {
        condom = "0";
      }

      // Total order price
      var cookieSub = parseInt(cookie.charAt(0)*50);
      var drinkSub = parseInt(redBull.charAt(0)*200);
      var condomSub = parseInt(condom.charAt(0)*50);

      var tot = cookieSub + drinkSub + condomSub;
      var tstring = tot.toString();
      if(tot >= 1000) {
        total = "$" + tstring.substr(0,2) + "." + tstring.substr(2);
      } else {
        total = "$" + tstring.substr(0,1) + "." + tstring.substr(1);
      }
      console.log(total);
      
      
      // POST order message values
      
      console.log(list);
//      console.log(cookie+", "+redBull+", "+condom+" ordered to "+loc);
      console.log("customer number: "+number);

      $.post("/order/new",
      {
        location: loc,
        orderList: list,
        phoneNumber: number
      },
      
      function() {
        console.log("POST success")
      });
      
      
      
  });
  
  $("select").change(function (){
    console.log("change detected");
    $("#totalText").text(total);
  })

});