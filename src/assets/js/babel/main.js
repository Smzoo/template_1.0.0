'use strict';

(function ($) {
  var _this = this;

  // common
  ///////////////////
  var DATA = {

    $win: $(window),
    $body: $('body'),

    spW: 640,
    tabW: 768,
    breakPointPC: 1024,
    scrollTop: 0,
    scrollLeft: 0,

    init: function init() {

      var self = _this;
      self.$win = $(window);
      self.$body = $('body');
      self.winW = self.$win.width();
      self.winH = self.$win.height();
      self.bodyH = self.$body.height();
      self.isMini = self.$win.width() <= self.spW;
      self.isTab = self.spW <= self.$win.width() && self.$win.width() <= self.tabW;
      self.isPC = self.tabW <= self.$win.width() && self.$win.width() <= self.breakPointPC;

      var resize = function resize() {

        self.winW = self.$win.width();
        self.winH = self.$win.height();
        self.isMini = self.$win.width() <= self.spW;
        self.isTab = self.spW <= self.$win.width() && self.$win.width() <= self.tabW;
        self.isPC = self.tabW <= self.$win.width() && self.$win.width() <= self.breakPointPC;
      };
      resize();
      self.$win.on('resize', function () {

        resize();
      });

      var scroll = function scroll() {

        self.scrollTop = self.$win.scrollTop();
        self.scrollLeft = self.$win.scrollLeft();
      };
      scroll();
      self.$win.on('scroll', function () {

        scroll();
      });
    },
    transitionEnd: 'oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend'

  };
  DATA.init();

  // main
  /////////////////////
  var main = function main() {

    // common variable
    //////////////////////////////
    var $wrap = $('#wrap');

    var loading = function loading() {

      setTimeout(function () {

        $wrap.addClass('is-active').find('.js-late').addClass('is-active');
      }, 100);
    };

    var pace = function pace() {

      paceOptions = {
        ajax: false,
        document: false,
        eventLag: false,
        restartOnPushState: true
      };

      Pace.on('done', function () {

        DATA.$body.addClass('ready');
      });
    };
    pace();

    // show mobile navigation
    /////////////////////////////
    var actionSpHeader = function actionSpHeader(target, navi) {

      var $spGnav = navi,
          $spGnavBtn = target;

      var isSpGnavOpen = false;

      $spGnavBtn.on('click', function (e) {

        e.preventDefault();

        if (!isSpGnavOpen) {

          $('body').on('touchmove.noScroll', function (e) {

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

      var thumbnail = function thumbnail() {

        $('.js-slider-thumb').owlCarousel({
          animateOut: 'fadeOut',
          smartSpeed: 600,
          loop: true,
          autoplay: true,
          autoplayTimeout: 1500,
          autoplayHoverPause: true,
          items: 1,
          dots: false,
          thumbs: true,
          thumbImage: true,
          thumbContainerClass: 'owl-thumbs',
          thumbItemClass: 'owl-thumb-item'
        });
      };
      thumbnail();
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

      DATA.$win.on('scroll', $.throttle(1000 / 15, function () {

        viewPosition();
      }));
    };

    $('.js-fadein').each(function () {

      var $this = $(this),
          offset = $this.offset().top;

      DATA.$win.on('scroll', function () {

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
    DATA.$win.on('load', function () {

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

  };
  main();
})(jQuery);
