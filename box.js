 // Credit to http://www.sundoginteractive.com/sunblog/posts/jquery-hover-box
$(function() {
    var moveLeft = 0;
    var moveDown = 0;
    $('a.modified').hover(function(e) {
        console.log("Got There");
        // it's original 
        document.body.append("<div class='data-popbox'><canvas id='chart' width='400' height='200'></canvas></div>");
        $.post("//suhasarehalli.me/python/shades", { username: names[i].textContent.slice(1), isChart: true }, function(data, status) {
            var ctx = doucument.getElementbyId("chart").getContext("2d");
            var newChart = new Chart(ctx).Line(data);
         });
        // and old again
        $(target).show();
        moveLeft = $(this).outerWidth();
        moveDown = ($(target).outerHeight() / 2);
    }, function() {
        var target = '#' + ($(this).attr('data-popbox'));
        $(target).hide();
    });
 
    $('a.modified').mousemove(function(e) {
        var target = '#' + ($(this).attr('data-popbox'));
         
        leftD = e.pageX + parseInt(moveLeft);
        maxRight = leftD + $(target).outerWidth();
        windowLeft = $(window).width() - 40;
        windowRight = 0;
        maxLeft = e.pageX - (parseInt(moveLeft) + $(target).outerWidth() + 20);
         
        if(maxRight > windowLeft && maxLeft > windowRight)
        {
            leftD = maxLeft;
        }
     
        topD = e.pageY - parseInt(moveDown);
        maxBottom = parseInt(e.pageY + parseInt(moveDown) + 20);
        windowBottom = parseInt(parseInt($(document).scrollTop()) + parseInt($(window).height()));
        maxTop = topD;
        windowTop = parseInt($(document).scrollTop());
        if(maxBottom > windowBottom)
        {
            topD = windowBottom - $(target).outerHeight() - 20;
        } else if(maxTop < windowTop){
            topD = windowTop + 20;
        }
     
        $(target).css('top', topD).css('left', leftD);
     
    });
  });
  // End Copied Code
