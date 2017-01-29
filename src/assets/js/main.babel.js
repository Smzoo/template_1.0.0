(function($) {

  // common
  ///////////////////
  const DATA = {

    $win: $(window),
    $body: $('body'),

    spW: 640,
    tabW: 768,
    breakPointPC: 1024,
    scrollTop: 0,
    scrollLeft: 0,

    init: () => {

      let self = this;
      self.$win = $(window);
      self.$body = $('body');
      self.winW = self.$win.width();
      self.winH = self.$win.height();
      self.bodyH = self.$body.height();
      self.isMini = self.$win.width() <= self.spW;
      self.isTab = self.spW <= self.$win.width() && self.$win.width() <= self.tabW;
      self.isPC = self.tabW <= self.$win.width() && self.$win.width() <= self.breakPointPC;

      let resize = () => {

        self.winW = self.$win.width();
        self.winH = self.$win.height();
        self.isMini = self.$win.width() <= self.spW;
        self.isTab = self.spW <= self.$win.width() && self.$win.width() <= self.tabW;
        self.isPC = self.tabW <= self.$win.width() && self.$win.width() <= self.breakPointPC;

      }
      resize();
      self.$win.on('resize', () => {

        resize();

      });

      let scroll = () => {

        self.scrollTop = self.$win.scrollTop();
        self.scrollLeft = self.$win.scrollLeft();

      }
      scroll();
      self.$win.on('scroll', () => {

        scroll();

      });

    },
    transitionEnd: 'oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend'

  };
  DATA.init();

  // main
  /////////////////////
  const main = () => {

    // common variable
    //////////////////////////////
    const $wrap = $('#wrap');

    const loading = () => {

      setTimeout(() => {

        $wrap.addClass('is-active').find('.js-late').addClass('is-active');

      }, 100);

    };


    const pace = () => {

      paceOptions = {
        ajax: false,
        document: false,
        eventLag: false
      };

      Pace.on('done', () => {

        DATA.$body.addClass('ready');

      });

    }
    pace();


    // show mobile navigation
    /////////////////////////////
    const actionSpHeader = (target, navi) => {

      const $spGnav = navi,
            $spGnavBtn = target;

      let isSpGnavOpen = false;

      $spGnavBtn.on('click', function(e) {

        e.preventDefault();

        if (!isSpGnavOpen) {

          $('body').on('touchmove.noScroll', function(e) {

            e.preventDefault();

          });

          $spGnav.addClass('is-open');
          isSpGnavOpen = true;

        } else {

          $('body').off('.noScroll');
          $spGnav.removeClass('is-open');
          isSpGnavOpen = false;

        }

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
//    const dropDownMenu = (target) => {
//
//      target.on('click', function(e) {
//
//        e.preventDefault();
//        $(this).toggleClass('is-active').next().stop().slideToggle(400, 'easeOutCubic');
//
//      });
//
//    };


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
//    const fbResize = (target) => {
//
//      const fbBox = target.html();
//      let timer = false;
////      let targetW = target.width();
//      let w = DATA.$winW;
//
//      DATA.$win.resize(function() {
//
//        if (w != DATA.$winW) {
//
//          if (timer !== false) {
//
//            clearTimeout(timer);
//
//          }
//
//          timer = setTimeout(() => {
//
//            target.html(fbBox);
//            window.FB.XFBML.parse();
//            w = DATA.$win.width();
//
//          }, 500);
//
//        }
//
//      });
//
//    };


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
          scrollHeight = DATA.$win.scrollTop();
          windowHeight = DATA.$winH;

          outDistance = 30;

          if (scrollHeight > itemTopPosition - windowHeight + outDistance) {

            $(this).addClass('is-current');

          } else {

            $(this).removeClass('is-current');

          }

        });

      };
      viewPosition();

      DATA.$win.on('scroll', $.throttle(1000 / 15, function() {

        viewPosition();

      }));

    };


    $('.js-fadein').each(function() {

      let $this = $(this),
          offset = $this.offset().top;

      DATA.$win.on('scroll', function() {

        if ($(this).scrollTop() + DATA.$winH > offset + 200) {

          $this.addClass('is-show');

        }

      });

    });


    /////////////////////////////////
    //
    // load event
    //
    /////////////////////////////////
    DATA.$win.on('load', () => {

      actionTab();
      scrollBox();
      scrollFadeIn($('.js-fadein-wrap'));
      //
      carouselInit();
      loading();
      actionSpHeader();

    });


    // Process when the window resize is over
    //////////////////////////////
//    let finishResizeEvent = () => {
//      let timer = false;
//
//      DATA.$win.resize(function() {
//        if (timer !== false) {
//          clearTimeout(timer);
//        }
//        timer = setTimeout(function() {
//          DATA.$winW = DATA.$win.width();
//          windowH = DATA.$win.height();
//          scrollBoxUpdate();
//        }, 300);
//      });
//
//    };
//    finishResizeEvent();


  }
  main();

})(jQuery);
