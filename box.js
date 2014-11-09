 // Credit to http://www.sundoginteractive.com/sunblog/posts/jquery-hover-box
function bindLink() {
    console.log("almost got there");
    var moveLeft = 0;
    var moveDown = 0;
    $("a.modified").hover(function(e) {
        console.log("Got There");
        // it's original
        var div = document.createElement('div');
        div.width = 400;
        div.height = 200;
        div.id = 'box';
        div.className = 'popbox';
        document.body.appendChild(div);
        $.post("//suhasarehalli.me/python/shades", { username: this.textContent.slice(1), isChart: true }, function(data, status) {
         var plot = $.plot(document.getElementById('box'), data);
         });
        // and old again
        $('#box').show();
        moveLeft = $(this).outerWidth();
        moveDown = ($('#box').outerHeight() / 2);
    }, function() {
        $('#box').hide();
    });
 
    $("a.modified").mousemove(function(e) {
        var target = '#box';
         
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
  }
  // End Copied Code
