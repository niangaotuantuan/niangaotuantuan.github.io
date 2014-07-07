function frame1() {
  $("#hero-1").click(function(){
    $(this).unbind("click");
    $(this).find(".yun").animate({
      fontSize: 0,
      opacity: 0
    },500,function(){
      $("#hero-1").hide(0, function(){
        $("#hero-2").fadeIn(300);
      });
      $("#intro-1").hide();
      $("#intro-2").show();
    });
  });
}

$(document).ready(function(){
  frame1();
});

