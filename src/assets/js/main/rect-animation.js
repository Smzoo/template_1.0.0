import Util from './util';
import TweenMax from 'TweenMax';
import TimelineMax from 'TweenMax';

/**
 *
 *  Rect animation
 *
 *  ブロックが開いて閉じるアニメーション
 *
 *
 */
const RectAnimation = (($) => {

  const RectAnimation = class {

    /**
     * Constructor
     *
     * @param element DOM
     * @param {string} アニメーションの方向を決定します
     */
    constructor(target, direction) {

      this.target = $(target);
      this.direction = direction;

      this.layout();

    }

    /**
     * optionのセット
     * @param options
     */
    setOption(options) {

      this.options = {

        isContentHidden: true,

        direction: 'lr',
        bgcolor: '#333333',
        duration: .5,
        easing: Power2.easeInOut,
        onCover: function() {

          return false;

        },
        onStart: function() {

          return false;

        },
        onComplete: function() {

          return false;

        }

      };

      let util = new Util();
      util.extend(this.options, options);

    }

    /**
     * 高さを取得
     */
    getHeight() {

      const height = this.target.height();
      return height;

    }

    /**
     * 幅を取得
     */
    getWidth() {

      const width = this.target.width();
      return width;

    }

    /**
     * rectの初期値を返す
     * @returns {string}
     */
    initRect() {

      const height = this.getHeight(),
            width = this.getWidth();

      if (this.direction === 'lr') {

        return `rect(0px 0px ${height} 0px)`;

      } else if (this.direction === 'rl') {

        return `rect(0px ${width} ${height} ${width})`;

      } else if (this.direction === 'tb') {

        return `rect(0px ${width} 0px 0px)`;

      } else if (this.direction === 'bt') {

        return `rect(${height} ${width} ${height} 0px)`;

      }

    }

    /**
     * mask要素の作成
     */
    layout() {


      let position = this.target.css('position');

      if (position !== 'fixed' && position !== 'absolute' && position !== 'relative') {

        this.target.css('position', 'relative');

      }

      this.mask = $('<div>').addClass('c-block_mask').css({

        position: 'absolute',
        zIndex: 99,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

      });

      TweenMax.set(this.mask, {

        clip: this.initRect(this.direction)

      });

      this.target.wrapInner('<div>').children().css('opacity', 0).addClass('c-block_inner').parent().prepend(this.mask);

    }

    /**
     * アニメーション用のrectの値を取得する
     * @param width
     * @param height
     * @param end
     * @returns {string}
     */
    getRect(width, height, end) {

      let rect = {

        top: 0,
        right: 0,
        bottom: 0,
        left: 0

      };

      if (this.direction === 'lr') {

        rect.bottom = height;
        rect.right = width;

        if (end) {

          rect.left = width;

        }

      } else if (this.direction === 'rl') {

        rect.bottom = height;
        rect.right = width;

        if (end) {

          rect.right = 0;

        }

      } else if (this.direction === 'tb') {

        rect.right = width;
        rect.bottom = height;

        if (end) {

          rect.top = height;

        }

      } else if (this.direction === 'bt') {

        rect.right = width;
        rect.bottom = height;

        if (end) {

          rect.bottom = 0;

        }

      }

      return `rect(${rect.top}px ${rect.right}px ${rect.bottom}px ${rect.left}px)`;

    }

    // public
    // - - - -- - - - - -  - - - -
    /**
     * アニメーション実行
     */
    anim() {


      const tl = new TimelineMax({

            }),
            height = this.getHeight(),
            width = this.getWidth(),
            fromRect = this.getRect(width, height, false),
            toRect = this.getRect(width, height, true),
            self = this;

      tl.to(this.mask, .5, {

        clip: fromRect,
        ease: Power3.easeInOut,

      }).add(function() {

        self.mask.next('.c-block_inner').css('opacity', 1);

      }).to(this.mask, .5, {

        clip: toRect,
        ease: Power2.easeInOut

      });


    }

  };

  return RectAnimation;

})(jQuery);

export default RectAnimation;
