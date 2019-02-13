jQuery(document).ready(function($){

    var offset = 1250; 
    var duration = 800; 
    jQuery(window).scroll(function() { 
        if (jQuery(this).scrollTop() > offset) { 
        jQuery('.back-to-top').fadeIn(duration); 
        } else { 
        jQuery('.back-to-top').fadeOut(duration); 
        }
    });
    jQuery('.back-to-top').click(function(event) { 
    event.preventDefault(); 
    jQuery('html, body').animate({scrollTop: 0}, duration); 
    return false; 
    })


    // alertbar later
    $(document).scroll(function () {
        var maxScroll = $(document).height() - $(window).height();
        var y = $(this).scrollTop();
        if (y > 350 || y + 100 > maxScroll) {
            $('.alertbar').fadeIn();
        } else {
            $('.alertbar').fadeOut();
        }
    });


        // Smooth scroll to an anchor
        $('a.smoothscroll[href*="#"]')
          // Remove links that don't actually link to anything
          .not('[href="#"]')
          .not('[href="#0"]')
          .click(function(event) {
            // On-page links
            if (
              location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
              &&
              location.hostname == this.hostname
            ) {
              // Figure out element to scroll to
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
              // Does a scroll target exist?
              if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                  scrollTop: target.offset().top
                }, 1000, function() {
                  // Callback after animation
                  // Must change focus!
                  var $target = $(target);
                  $target.focus();
                  if ($target.is(":focus")) { // Checking if the target was focused
                    return false;
                  } else {
                    $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                    $target.focus(); // Set focus again
                  };
                });
              }
            }
          });
    
    
    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('nav').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();
        var brandrow = $('.brandrow').css("height");
        
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down            
            $('nav').removeClass('nav-down').addClass('nav-up'); 
            $('.nav-up').css('top', - $('nav').outerHeight() + 'px');
           
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {               
                $('nav').removeClass('nav-up').addClass('nav-down');
                $('.nav-up, .nav-down').css('top', '0px');             
            }
        }

        lastScrollTop = st;
    }
        
    const issueID = jQuery("#gh-comments-list").text();
    if (issueID) {
      const url = `https://github.com/serverlessland/serverlessland/issues/${issueID}`;
      const api_url = `https://api.github.com/repos/serverlessland/serverlessland/issues/${issueID}/comments`;
      jQuery.ajax(api_url, {
        headers: {Accept: "application/vnd.github.v3.html+json"},
        dataType: "json",
        success: function(comments) {
            jQuery("#gh-comments-list").html("Visit the <b><a href='" + url + "'>Github Issue</a></b> to comment on this page");
            jQuery("#gh-comments-list").show();
            jQuery.each(comments, function(i, comment) {

                var date = new Date(comment.created_at);

                var t = "<div id='gh-comment'>";
                t += "<img src='" + comment.user.avatar_url + "' width='24px'>";
                t += "<b><a href='" + comment.user.html_url + "'>" + comment.user.login + "</a></b>";
                t += " posted at ";
                t += "<em>" + date.toUTCString() + "</em>";
                t += "<div id='gh-comment-hr'></div>";
                t += comment.body_html;
                t += "</div>";
                jQuery("#gh-comments-list").append(t);
            });
        },
        error: function() {
            jQuery("#gh-comments-list").append("Comments are not open for this page yet.");
        }
      });    
    }

});
