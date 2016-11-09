$(function(){
  window.onscroll = function() {
    scroll();
  }


    var aftertop = $(window).scrollTop()
    var navHeight = $("nav").height();
    var windowHeight = $(window).height();
    if (navHeight <= windowHeight) {
      navHeight = windowHeight;
    }

    var navDl = $('.content').siblings('nav').find('dl');




    function scroll() {

      //content top
      var contentTop = $('.content').offset().top;
      //content 高度
      var contentHeight = $('.content').height();
      //nav 

      //滚动条高度
      var nowtop = $(window).scrollTop();

      //判断方向 下
      if (aftertop <= nowtop) {
        aftertop = nowtop;
        // console.log('下');
        if($('.content').height() > 600){
            if (nowtop > 786-windowHeight) {
              navDl.removeClass('abs')
              navDl.addClass('fixed'); 
              navDl.css({'top':'auto','bottom':0});
            }

           if (nowtop >= $('.content').height() - 600) {
              navDl.removeClass('fixed')
              navDl.addClass('abs');
             // var contentTop 700

              navDl.css({
                'top': $('.content').height() - 700,
                'bottom':0
              });
            }
        }
        
      } else {
        // console.log('上');
        aftertop = nowtop;
        if($('.content').height() > 600){
            if (nowtop > 86) {
              navDl.removeClass('abs')
              navDl.addClass('fixed')
              navDl.css({
                'top': 0
              });
            }

            if (nowtop >= $('.content').height() - 600) {
              navDl.removeClass('fixed')
              navDl.addClass('abs');
              navDl.css({
                'top': $('.content').height() - 700
              });
            }

            if (nowtop <= 86) {
              navDl.removeClass('abs')
              navDl.removeClass('fixed')
            }
        }
      }
    }
})