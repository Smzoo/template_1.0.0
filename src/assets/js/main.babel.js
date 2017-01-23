

(function($) {

  //
  // main
  //
  /////////////////////
  const main = () => {

    // common variable
    //////////////////////////////////////
    const $window = $(window),
          wrap = $('#wrap');
//    let mainArea = $('#main');
    //
    let windowW = $window.width();
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
    const loadLate = () => {

      wrap.find('.js-late').addClass('is-active');

    };


    const loadWindow = () => {

      const loading = () => {

        setTimeout(() => {

          wrap.addClass('is-active');

        }, 100);

        setTimeout(loadLate(), 100);

      };

      loading();

    };


    // show mobile navigation
    /////////////////////////////
    const actionSpHeader = (target, navi) => {

      target.on('click', function(e) {

        e.preventDefault();
        $(this).toggleClass('is-active');

        $(navi).stop().slideToggle(400, 'easeOutCubic');

      });

    };


    // home tab
    /////////////////////////
    const actionTab = () => {

      const tabWrap = $('#js-tab'),
            trigger = tabWrap.find('.js-tab-trigger'),
            tabItem = tabWrap.find('.js-tab-item');
      let anchor;

      trigger.on('click', function(e) {

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
    const dropDownMenu = (target) => {

      target.on('click', function(e) {

        e.preventDefault();
        $(this).toggleClass('is-active').next().stop().slideToggle(400, 'easeOutCubic');

      });

    };


    // carousel
    /////////////////////////////
    const carouselInit = () => {

      const fadeSingle = () => {

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

      }
      fadeSingle();

      const slideBasic = () => {

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

      }
      slideBasic();

      const slideCenter = () => {

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

      }
      slideCenter();

      const customNavi = () => {

        const owl = $('.js-slider-my-nav');

        owl.owlCarousel({
          loop: true,
          margin: 10,
          smartSpeed: 600,
          autoplay: true,
          autoplayTimeout: 1500,
          autoplayHoverPause: true
        });

        owl.next().find('.js-slider-nav-prev').on('click', function(e) {

          e.preventDefault();
          owl.trigger('prev.owl.carousel');

        });

        owl.next().find('.js-slider-nav-next').on('click', function(e) {

          e.preventDefault();
          owl.trigger('next.owl.carousel');

        });

      }
      customNavi();


    };


    const scrollBox = () => {

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
    const fbResize = (target) => {

      const fbBox = target.html();
      let timer = false;
//      let targetW = target.width();
      let w = windowW;

      $window.resize(function() {

        if (w != windowW) {

          if (timer !== false) {

            clearTimeout(timer);

          }

          timer = setTimeout(() => {

            target.html(fbBox);
            window.FB.XFBML.parse();
            w = $window.width();

          }, 500);

        }

      });

    };


    //scroll fadein contents
    /////////////////////////////
    const scrollFadeIn = (target) => {

      let fadeInItem,
          itemTopPosition,
          scrollHeight,
          windowHeight,
          outDistance;

      const viewPosition = () => {

        fadeInItem = target.children();

        fadeInItem.each(function() {

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

      $window.on('scroll', $.throttle(1000 / 15, function() {

        viewPosition();

      }));

    };


    /////////////////////////////////
    //
    // load event
    //
    /////////////////////////////////
    $window.on('load', () => {

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


  }
  main();

})(jQuery);
