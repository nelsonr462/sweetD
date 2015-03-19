$(function(){                          //<- equivalent to attribute
  $(".form").submit(function(event){  // <-   onsubmit="convert()"
      event.preventDefault();
      event.stopPropagation();

      // User input taken //
      var number = $("#phoneNumber").val();      // <- equivalent to elementbyid(id).value
      var loc = $("#location").val();
      var cookie = $("#chipCookies").val();
      var redBull = $("#redBull").val();
      var condom = $("#condoms").val();
      
      if(cookie == "Chocolate Chip Cookies") {
        cookie = null;
      }
      
      if(redBull == "Red Bull") {
        redBull = null;
      }
      
      if(condom == "Condoms") {
        condom = null;
      }
      
      console.log(cookie+", "+redBull+", "+condom+" ordered to "+loc);
      console.log("customer number: "+number);
      console.log("success");
    

  });
});