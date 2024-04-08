//LOADER
jQuery(window).on("load", function () {
   "use strict";
   jQuery(".loader").fadeOut(800);

});


jQuery(function ($) {
   "use strict";
   var $window = $(window);
   var windowsize = $(window).width();
   var $root = $("html, body");
   var $this = $(this);


   //Contact Us
$("#submit_btn").click(function() {

    var user_name = $('input[name=first_name]').val() + ' ' + $('input[name=last_name]').val();
    var user_email = $('input[name=email]').val();
    var user_phone = $('input[name=phone]').val();
    var user_message = $('textarea[name=message]').val();

    //simple validation at client's end
    var post_data, output;
    var proceed = true;
    if (user_name == "") {
        proceed = false;
    }
    if (user_email == "") {
        proceed = false;
    }
   // if (user_phone == "") {
        //proceed = false;
   // }

    if (user_message == "") {
        proceed = false;
    }
    //everything looks good! proceed...
    if (proceed) {

        //data to be sent to server
        post_data = { 'userName': user_name, 'userEmail': user_email, 'userPhone': user_phone, 'userMessage': user_message };

        //Ajax post data to server
        $.post('contact.php', post_data, function(response) {

            //load json data from server and output message
            if (response.type == 'error') {
                output = '<div class="alert-danger" style="padding:10px; margin-bottom:25px;">' + response.text + '</div>';
            } else {
                output = '<div class="alert-success" style="padding:10px; margin-bottom:25px;">' + response.text + '</div>';

                //reset values in all input fields
                $('.getin_form input').val('');
                $('.getin_form textarea').val('');
            }

            $("#result").hide().html(output).slideDown();
        }, 'json');

    }
    else {
           output = '<div class="alert-danger" style="padding:10px; margin-bottom:25px;">Please provide the missing fields.</div>';
           $("#result").hide().html(output).slideDown();
    }

});

 /*  $(document).on('contextmenu', function() {
     return false;
   });
 */




   /* ----- Back to Top ----- */
   $("body").append('<a href="#" class="back-top"><i class="fa fa-angle-up"></i></a>');
   var amountScrolled = 700;
   var backBtn = $("a.back-top");
   $window.on("scroll", function () {
      if ($window.scrollTop() > amountScrolled) {
         backBtn.addClass("back-top-visible");
      } else {
         backBtn.removeClass("back-top-visible");
      }
   });
   backBtn.on("click", function () {
      $root.animate({
         scrollTop: 0
      }, 100);
      return false;
   });


   if($(".just-sidemenu").length){
      var anchor_point = $(".rotating-words").height();
      var side_toggle = $(".just-sidemenu #sidemenu_toggle");
      side_toggle.addClass("toggle_white");
      $window.on("scroll", function () {
      if ($window.scrollTop() >= anchor_point) {
         side_toggle.removeClass("toggle_white");
      } else {
         side_toggle.addClass("toggle_white");
      }
   });
   }



   /*----- Menu On click -----*/
    if ($("#sidemenu_toggle").length) {
       $("body").addClass("pushwrap");
       $("#sidemenu_toggle").on("click", function () {
          $(".pushwrap").toggleClass("active");
          $(".side-menu").addClass("side-menu-active"), $("#close_side_menu").fadeIn(700)
       }), $("#close_side_menu").on("click", function () {
          $(".side-menu").removeClass("side-menu-active"), $(this).fadeOut(200), $(".pushwrap").removeClass("active")
       }), $("#btn_sideNavClose").on("click", function () {
          $(".side-menu").removeClass("side-menu-active"), $("#close_side_menu").fadeOut(200), $(".pushwrap").removeClass("active")
       });
    }


   /* ------- Smooth scroll ------- */
   $("a.pagescroll").on("click", function (event) {
      event.preventDefault();
      $("html,body").animate({
         scrollTop: $(this.hash).offset().top
      }, 100);
   });
    /*hide menu on mobile click*/
   $(".navbar-nav>li>a").on("click", function(){
    $(".navbar-collapse").collapse("hide");
   });

   /*$(".dl-menu >.menu-item >a").on("click", function(){
    $(".pushmenu-right").collapse("hide");
   });*/



   /*------ MENU Fixed ------*/
   if ($("nav.navbar").hasClass("static-nav")) {
      $window.scroll(function () {
         var $scroll = $window.scrollTop();
         var $navbar = $(".static-nav");
         if ($scroll > 200) {
            $navbar.addClass("fixedmenu");
         } else {
            $navbar.removeClass("fixedmenu");
         }
      });
   }

   /*bottom menu fix*/
   if ($("nav.navbar").hasClass("fixed-bottom")) {
      var navHeight = $(".fixed-bottom").offset().top;
      $window.scroll(function () {
         if ($window.scrollTop() > navHeight) {
            $('.fixed-bottom').addClass('fixedmenu');
         } else {
            $('.fixed-bottom').removeClass('fixedmenu');
         }
      });
   }



   /* ----- Full Screen ----- */
   function resizebanner() {
      var $fullscreen = $(".full-screen");
      $fullscreen.css("height", $window.height());
      $fullscreen.css("width", $window.width());
   }
   resizebanner();
   $window.resize(function () {
      resizebanner();
   });


    /*----- Replace Images on Mobile -----*/
   fiximBlocks();
   porfoliofix();
   $window.resize(function () {
      fiximBlocks();
      porfoliofix();
   });

   function fiximBlocks() {
      if (windowsize < 993) {
         $(".half-section").each(function () {
            $(".img-container", this).insertAfter($(".split-box > .heading-title h2", this));
         });
      }
   }

   function porfoliofix() {
      if (windowsize < 768) {
            $("#portfolio_top .cbp-item:nth-child(2)", this).insertBefore($("#portfolio_top .cbp-item:nth-child(1)", this));
      }
   }


   /* -------- SKILL BARS -------- */
   //For Skills Bar on Different Pages
   $('.progress').each(function () {
      $(this).appear(function () {
         $(this).animate({opacity:1,left:"0px"},800);
         var b = jQuery(this).find(".progress-bar").attr("data-value");
         $(this).find(".progress-bar").animate({
            width: b + "%"
         }, 500);
      });
   });


   /* --------Equal Heights -------- */
   checheight();
   $window.on("resize", function () {
      checheight();
   });

   function checheight() {
      var $smae_height = $(".equalheight");
      if ($smae_height.length) {
         if (windowsize > 767) {
            $smae_height.matchHeight({
               property: "height",
            });
         }
      }
   }


   /* -------BG Video banner -------*/
   $(function () {
      if ($(".my-background-video").length) {
         $('.my-background-video').bgVideo();
      }
   });



   /* ----------- Counters ---------- */
   $(".value_formatter").data("countToOptions", {
      formatter: function (value, options) {
         return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
      }
   });
   $(".counters").appear(function () {
      $(".count_nums").each(count);
   });

   function count(options) {
      var $this = $(this);
      options = $.extend({}, options || {}, $this.data("countToOptions") || {});
      $this.countTo(options);
   }


   /* ---------- Parallax Backgrounds ---------- */
   if (windowsize > 992) {
      $(".parallaxie").parallaxie({
         speed: 0.55,
         offset: 0,
      });
   }



   /*----- Type Writter Effect -----*/
   if ($("#typewriting").length) {
      var app = document.getElementById("typewriting");
      var typewriter = new Typewriter(app, {
         loop: true
      });
      typewriter.typeString('Creative').pauseFor(2000).deleteAll()
         .typeString('Parallax').pauseFor(2000).deleteAll()
         .typeString('Flexible').start();
   }




   /* ----- Google Map ----- */
   if ($("#map-container").length) {
      function initialize() {
         var mapOptions = {
            zoom: 18,
            scrollwheel: false,
            styles: [{
               "featureType": "water",
               "elementType": "geometry",
               "stylers": [{
                  "color": "#e9e9e9"
            }, {
                  "lightness": 17
            }]
        }, {
               "featureType": "landscape",
               "elementType": "geometry",
               "stylers": [{
                  "color": "#f5f5f5"
            }, {
                  "lightness": 20
            }]
        }, {
               "featureType": "road.highway",
               "elementType": "geometry.fill",
               "stylers": [{
                  "color": "#ffffff"
            }, {
                  "lightness": 17
            }]
        }, {
               "featureType": "road.highway",
               "elementType": "geometry.stroke",
               "stylers": [{
                  "color": "#ffffff"
            }, {
                  "lightness": 29
            }, {
                  "weight": 0.2
            }]
        }, {
               "featureType": "road.arterial",
               "elementType": "geometry",
               "stylers": [{
                  "color": "#ffffff"
            }, {
                  "lightness": 18
            }]
        }, {
               "featureType": "road.local",
               "elementType": "geometry",
               "stylers": [{
                  "color": "#ffffff"
            }, {
                  "lightness": 18
            }]
        }, {
               "featureType": "poi",
               "elementType": "geometry",
               "stylers": [{
                  "color": "#f5f5f5"
            }, {
                  "lightness": 21
            }]
        }, {
               "featureType": "poi.park",
               "elementType": "geometry",
               "stylers": [{
                  "color": "#d5d5d5"
            }, {
                  "lightness": 21
            }]
        }, {
               "elementType": "labels.text.stroke",
               "stylers": [{
                  "visibility": "on"
            }, {
                  "color": "#f8f8f8"
            }, {
                  "lightness": 25
            }]
        }, {
               "elementType": "labels.text.fill",
               "stylers": [{
                  "saturation": 36
            }, {
                  "color": "#222222"
            }, {
                  "lightness": 30
            }]
        }, {
               "elementType": "labels.icon",
               "stylers": [{
                  "visibility": "off"
            }]
        }, {
               "featureType": "transit",
               "elementType": "geometry",
               "stylers": [{
                  "color": "#f5f5f5"
            }, {
                  "lightness": 19
            }]
        }, {
               "featureType": "administrative",
               "elementType": "geometry.fill",
               "stylers": [{
                  "color": "#fefefe"
            }, {
                  "lightness": 10
            }]
        }, {
               "featureType": "administrative",
               "elementType": "geometry.stroke",
               "stylers": [{
                  "color": "#fefefe"
            }, {
                  "lightness": 17
            }, {
                  "weight": 1.2
            }]
        }],
            center: new google.maps.LatLng(40.712775, -74.005973) //please add your location here
         };
         var map = new google.maps.Map(document.getElementById('map-container'),
            mapOptions);
         var marker = new google.maps.Marker({
            position: map.getCenter(),
            //icon: 'images/locating.png', if u want custom
            map: map
         });
      }
      google.maps.event.addDomListener(window, 'load', initialize);
   }

   /* Initializing Particles */
   if ($("#particles-js").length) {
      window.onload = function () {
         Particles.init({
            selector: '#particles-js',
            color: '#ffffff',
            connectParticles: false,
            sizeVariations: 14,
            maxParticles: 140,
         });
      };
   }

   /*Wow Animations*/
   if ($(".wow").length) {
      var wow = new WOW({
         boxClass: 'wow',
         animateClass: 'animated',
         offset: 0,
         mobile: true,
         live: true
      });
      new WOW().init();
   }


});

/*
jQuery(function () {
   jQuery("#bgndVideo").vimeo_player();
});
*/
