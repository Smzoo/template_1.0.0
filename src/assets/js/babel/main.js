'use strict';

(function ($) {

  //
  // main
  //
  /////////////////////
  var main = function main() {

    // common variable
    //////////////////////////////////////
    var $window = $(window),
        wrap = $('#wrap');
    //    let mainArea = $('#main');
    //
    var windowW = $window.width();
    //    let windowH = $window.height();
    //
    //    let padSize = 768;
    //    let pcSize = 1280;
    //    let largeSize = 1500;
    //    let spMaxSize = padSize - 1;
    //    let padMaxSize = pcSize - 1;
    //    let pcMaxSize = largeSize - 1;


    // load add class
    //////////////////////////////
    var loadLate = function loadLate() {

      wrap.find('.js-late').addClass('is-active');
    };

    var loadWindow = function loadWindow() {

      var loading = function loading() {

        setTimeout(function () {

          wrap.addClass('is-active');
        }, 100);

        setTimeout(loadLate(), 100);
      };

      loading();
    };

    // show mobile navigation
    /////////////////////////////
    var actionSpHeader = function actionSpHeader(target, navi) {

      target.on('click', function (e) {

        e.preventDefault();
        $(this).toggleClass('is-active');

        $(navi).stop().slideToggle(400, 'easeOutCubic');
      });
    };

    // home tab
    /////////////////////////
    var actionTab = function actionTab() {

      var tabWrap = $('#js-tab'),
          trigger = tabWrap.find('.js-tab-trigger'),
          tabItem = tabWrap.find('.js-tab-item');
      var anchor = void 0;

      trigger.on('click', function (e) {

        e.preventDefault();

        // trigger
        trigger.removeClass('is-active');
        anchor = $(this).addClass('is-active').attr('href');

        // panel item
        tabItem.removeClass('is-active').filter(anchor).addClass('is-active');
      });
    };

    // drop down action
    /////////////////////////////
    var dropDownMenu = function dropDownMenu(target) {

      target.on('click', function (e) {

        e.preventDefault();
        $(this).toggleClass('is-active').next().stop().slideToggle(400, 'easeOutCubic');
      });
    };

    // carousel
    /////////////////////////////
    var carouselInit = function carouselInit() {

      var fadeSingle = function fadeSingle() {

        $('.js-slider-fade').owlCarousel({
          animateOut: 'fadeOut',
          items: 1,
          margin: 0,
          stagePadding: 0,
          smartSpeed: 450,
          loop: true,
          autoplay: true,
          autoplayTimeout: 3000,
          autoplayHoverPause: true
        });
      };
      fadeSingle();

      var slideBasic = function slideBasic() {

        $('.js-slider-basic').owlCarousel({
          loop: true,
          margin: 10,
          nav: true,
          responsive: {
            0: {
              items: 1
            },
            600: {
              items: 3
            },
            1000: {
              items: 5
            }
          }
        });
      };
      slideBasic();

      var slideCenter = function slideCenter() {

        $('.js-slider-center').owlCarousel({
          center: true,
          items: 2,
          loop: true,
          margin: 10,
          smartSpeed: 1000,
          autoplay: true,
          autoplayTimeout: 1500,
          autoplayHoverPause: true
        });
      };
      slideCenter();

      var customNavi = function customNavi() {

        var owl = $('.js-slider-my-nav');

        owl.owlCarousel({
          loop: true,
          margin: 10,
          smartSpeed: 600,
          autoplay: true,
          autoplayTimeout: 1500,
          autoplayHoverPause: true
        });

        owl.next().find('.js-slider-nav-prev').on('click', function (e) {

          e.preventDefault();
          owl.trigger('prev.owl.carousel');
        });

        owl.next().find('.js-slider-nav-next').on('click', function (e) {

          e.preventDefault();
          owl.trigger('next.owl.carousel');
        });
      };
      customNavi();
    };

    var scrollBox = function scrollBox() {

      $('.js-scroll-box').perfectScrollbar({
        wheelSpeed: 0.8,
        minScrollbarLength: 100,
        wheelPropagation: true
      });
    };

    //    let scrollBoxUpdate = () => {
    //      $('.js-scroll-box').perfectScrollbar('update');
    //    };


    // facebook plugin resize
    ///////////////////////////
    var fbResize = function fbResize(target) {

      var fbBox = target.html();
      var timer = false;
      //      let targetW = target.width();
      var w = windowW;

      $window.resize(function () {

        if (w != windowW) {

          if (timer !== false) {

            clearTimeout(timer);
          }

          timer = setTimeout(function () {

            target.html(fbBox);
            window.FB.XFBML.parse();
            w = $window.width();
          }, 500);
        }
      });
    };

    //scroll fadein contents
    /////////////////////////////
    var scrollFadeIn = function scrollFadeIn(target) {

      var fadeInItem = void 0,
          itemTopPosition = void 0,
          scrollHeight = void 0,
          windowHeight = void 0,
          outDistance = void 0;

      var viewPosition = function viewPosition() {

        fadeInItem = target.children();

        fadeInItem.each(function () {

          itemTopPosition = $(this).offset().top;
          scrollHeight = $window.scrollTop();
          windowHeight = $window.height();

          outDistance = 30;

          if (scrollHeight > itemTopPosition - windowHeight + outDistance) {

            $(this).addClass('is-current');
          } else {

            $(this).removeClass('is-current');
          }
        });
      };
      viewPosition();

      $window.on('scroll', $.throttle(1000 / 15, function () {

        viewPosition();
      }));
    };

    /////////////////////////////////
    //
    // load event
    //
    /////////////////////////////////
    $window.on('load', function () {

      actionTab();
      actionSpHeader($('#js-header-trigger'), $('#js-sp-navi'));
      dropDownMenu($('.js-sp-btn', '#js-sp-navi'));
      dropDownMenu($('.js-footer-btn', '#js-footer-navi'));
      scrollBox();
      fbResize($('#js-foot-sns01'));
      fbResize($('#js-foot-sns02'));
      scrollFadeIn($('.js-fadein-wrap'));
      //
      loadWindow();
      //
      carouselInit();
    });

    // Process when the window resize is over
    //////////////////////////////
    //    let finishResizeEvent = () => {
    //      let timer = false;
    //
    //      $window.resize(function() {
    //        if (timer !== false) {
    //          clearTimeout(timer);
    //        }
    //        timer = setTimeout(function() {
    //          windowW = $window.width();
    //          windowH = $window.height();
    //          scrollBoxUpdate();
    //        }, 300);
    //      });
    //
    //    };
    //    finishResizeEvent();

  };
  main();
})(jQuery);