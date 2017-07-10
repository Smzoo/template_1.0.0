const DATA = {

  domain: window.location.protocol + window.location.hostname,
  spW: 320,
  tabW: 610,
  pcW: 1000,
  scrollTop: 0,
  scrollLeft: 0,

  init: function() {

    let self = this;
    self.$win = $(window);
    self.$body = $('body');
    self.$wrap = $('#wrap');
    self.winW = self.$win.width();
    self.winH = self.$win.height();
    self.bodyH = self.$body.height();
    self.isMini = self.$win.width() <= self.spW;
    self.isSp = self.spW <= self.$win.width() && self.$win.width() <= self.tabW;
    self.isTab = self.tabW <= self.$win.width() && self.$win.width() <= self.pcW;
    self.isPc = self.$win.width() >= self.pcW;

    let resize = () => {

      self.winW = self.$win.width();
      self.winH = self.$win.height();
      self.isMini = self.$win.width() <= self.spW;
      self.isSp = self.spW <= self.$win.width() && self.$win.width() <= self.tabW;
      self.isTab = self.tabW <= self.$win.width() && self.$win.width() <= self.pcW;
      self.isPc = self.$win.width() >= self.pcW;

    }
    resize();
    self.$win.on('resize', () => {

      resize();

    });

    let scroll = () => {

      self.scrollTop = self.$win.scrollTop();
      self.scrollLeft = self.$win.scrollLeft();

    };
    scroll();
    self.$win.on('scroll', () => {

      scroll();

    });

  },
  transitionEnd: 'oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend',
  animationEnd: 'webkitAnimationEnd oanimationend msAnimationEnd animationend'

};

export default DATA;
