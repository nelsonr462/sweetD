$(function(){
  var i = 0
  $("#thecookie").click(function(){
    switch(i) {
      case 0:
        $("#mainstuff").append("<p style=\"padding-top: 60px;\">(or just because we like you)</p>")
        i++
        break;
      case 1:
        $("#mainstuff").append("<p style=\"font-size: 10px; padding-top: 60px;\">(just kidding)</p>")
        i++
        break;
      case 2:
        $("#mainstuff").append("<p style=\"font-size: 10px; padding-top: 60px;\">(no really, we do like you though)</p>")
        i++
        break;
      case 3:
        $("#mainstuff").append("<p style=\"font-size: 10px; padding-top: 60px;\">(just not like that)</p>")
        i++
        break;
      case 4:
        $("#mainstuff").append("<p style=\"font-size: 10px; padding-top: 60px;\">. . .</p>")
        i++
        break;
      case 5:
        $("#mainstuff").append("<p style=\"font-size: 10px; padding-top: 60px;\">(okay, maybe like that)</p>")
        i++
        break;
      case 6:
        $("#mainstuff").append("<p style=\"font-size: 10px; padding-top: 60px;\">(just a little)</p>")
        i++
        break;
      case 7:
        $("#mainstuff").append("<p style=\"font-size: 10px; padding-top: 60px;\"> :) </p>")
        i++
        break;
    }
  })
})