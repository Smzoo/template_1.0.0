import 'babel-polyfill';

import DATA from './data';
// import Util from './util';
import Delete from './delete';
import RectAnimation from './rect-animation';

import TweenMax from 'TweenMax';
import 'gsap/ScrollToPlugin.js';
// import TimelineMax from 'TweenMax';

import 'owl.carousel/dist/owl.carousel';
import 'jquery.easing/jquery.easing';

DATA.init();


/*
 *
 * anchor scroll
 *
 */
const anchorScroll = (target) => {

  $(target).on('click', function() {

    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

      let hash = $(this.hash),
          targetOffset = 0;

      hash = hash.length && hash;

      const updatePos = () => {

        TweenMax.to(DATA.$wrap, 0, {

          scrollTo: {

            y: targetOffset + 1

          }

        });
        TweenMax.to(DATA.$wrap, 0, {

          scrollTo: {

            y: targetOffset - 1

          }

        });

      };

      if (hash.length) {

        //wrap内をスクロールするから wrapのスクロール量を足しておく
        targetOffset = hash.offset().top - 80 + DATA.$wrap.scrollTop();

        TweenMax.to(DATA.$wrap, 1, {

          scrollTo: {

            y: targetOffset,
            x: 0

          },
          ease: Power3.easeOut,
          onComplete: function() {

            updatePos();

          }

        });

      }

      return false;

    }

  });

};
anchorScroll('.js-scroll');


/**
 *
 * element viewport in addClass
 *
 */
const showElement = (target) => {

  $(target).each(function() {

    let $this = $(this),
        offset = $this.offset().top,
        count = 0,
        direction = $this.attr('data-direction'),
        mask;

    if (direction) {

      mask = new RectAnimation(this, direction);

    }

    DATA.$win.on('scroll', function() {

      if (DATA.scrollTop + DATA.winH > offset + 210) {

        $this.addClass('is-show');

        if (count === 0) {

          mask.anim();
          count = 1;

        }

      } else {

        $this.removeClass('is-show');

      }

    });

  });

};
showElement('.js-fadein', DATA.$wrap);


/**
 * .js-loadクラスを持つ要素にクラスを付与する
 */
const loadedClass = () => {

  $('.js-load', DATA.$wrap).addClass('is-loaded');

};

/**
 * ヘッダーの高さ分mainにpaddingを与える
 */
const headerHeight = () => {

  $('#main').css({

    paddingTop: $('#header').outerHeight()

  });

};


/**
 * ウィンドウを読み込んだ時の処理
 * movieがある時はmovieの自動再生を待ってあげる
 */
const loadWindow = () => {

  let $video = $('.p-home_video');

  /**
   * ここに実行したい関数をまとめる
   */
  const func = () => {

    loadedClass();
    headerHeight();

  };

  if ($video.length && !DATA.isSp) {


    $video.get(0).onplay = function() {

      func();

    };

  } else {

    DATA.$win.on('load', () => {

      func();

    });

  }

};
loadWindow();

/**
 * parallax scroll effect
 */
const parallaxScroll = () => {

  /**
   *
   * @type {number}
   */
  let delta = 3,
      speed = .8,
      target = $('[data-parallax]', DATA.$wrap),
      el,
      coefficent,
      offsetTop,
      transY;

  /**
   *
   * @param scroll
   */
  const scrollMove = (scroll) => {

    target.each(function() {

      el = $(this);
      coefficent = el.attr('data-parallax');
      offsetTop = el.offset().top - scroll;
      transY = offsetTop * -coefficent / delta;

      TweenMax.to(el, speed, {

        y: transY,
        ease: Power3.easeOut,

      });

    });

  };

  DATA.$wrap.on('scroll', function() {

    scrollMove(DATA.$wrap.scrollTop());

  });


};
parallaxScroll();


/**
 * ローディングアニメーション
 * @param target
 */
const loaderAnim = (target) => {

  let $animItem = $(target),
      number = $animItem.length;

  TweenMax.set($animItem, {

    transformPerspective: 500

  });

  TweenMax.staggerTo($animItem, number * .1 / 2, {

    rotationY: 180,
    ease: Power2.easeInOut,
    yoyo: true,
    repeat: -1,
    repeatDelay: 0

  }, .1);

};


/**
 *
 * span element
 * 任意のテキストを１文字ずつspanで囲う
 */
const spanText = (text) => {

  let $target = $(text);

  $target.children().addBack().contents().each(function() {

    if (this.nodeType == 3) {

      $(this).replaceWith($(this).text().replace(/(\S)/g, '<span style="display: inline-block;">$1</span>'));

    }

  });

  if ($target.hasClass('c-loader_text')) {

    loaderAnim($('span', $target));

  }

};
spanText('.js-span');


/**
 * モバイルメニューを開く
 * @param target
 * @param trigger
 */
const menuOpen = (target, trigger) => {

  let $target = $(target),
      $trigger = $(trigger);

  $trigger.on('click', function(e) {

    e.preventDefault();

    $(this).toggleClass('is-open');
    $target.toggleClass('is-open');
    $('#header').toggleClass('is-open');

  });

};
menuOpen('#js-navigation', '#js-navi-trigger');


/**
 * クリックして次の要素をドロップダウン
 * @param target
 */
const dropDownMenu = (target) => {

  /**
   *
   * @type {*}
   */
  let $target = $(target);

  $target.on('click', function(e) {

    e.preventDefault();
    $(this).toggleClass('is-open').next().stop().slideToggle(550, 'easeInOutCubic');

  });

};
dropDownMenu('.js-dropdown-trigger');


/**
 * スクロールしたらクラスをつける
 */
const startScroll = () => {

  DATA.$wrap.on('scroll', function() {

    if (DATA.$wrap.scrollTop() > 0) {

      $('#header').addClass('is-scroll');

    } else {

      $('#header').removeClass('is-scroll');

    }

  });

};
startScroll();


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


  const thumbnail = () => {

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
carouselInit();


//const scrollBox = () => {
//
//  $('.js-scroll-box').perfectScrollbar({
//    wheelSpeed: 0.8,
//    minScrollbarLength: 100,
//    wheelPropagation: true
//  });
//
//};

//    let scrollBoxUpdate = () => {
//      $('.js-scroll-box').perfectScrollbar('update');
//    };


    /**
     * facebook plugin resize
     */
    const fbResize = (target) => {

      const fbBox = target.html();

      let timer = false,
          w = DATA.$winW;
 //   let targetW = target.width();

      DATA.$win.resize(function() {

        if (w != DATA.$winW) {

          if (timer !== false) {

            clearTimeout(timer);

          }

          timer = setTimeout(() => {

            target.html(fbBox);
            window.FB.XFBML.parse();
            w = DATA.$win.width();

          }, 500);

        }

      });

    };
    fbResize();


const DeleteBtn = new Delete('.js-delete-target', '.js-delete-trigger');
DeleteBtn.trigger();
