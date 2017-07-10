import DATA from './data';

const Util = (() => {

  DATA.init();

  class Util {

    constructor(target) {

      this._target = target;

    }

    /**
     * obj merge
     * オプションのキーが存在するときだけ新しいオブジェクトにマージする
     * @param a
     * @param b
     * @returns {*}
     */
    extend(a, b) {

      for (let key in b) {

        if (b.hasOwnProperty(key)) {

          a[key] = b[key];

        }

      }
      return a;

    }


    /**
     *
     * @param func
     */
    finishResize(func) {

      let timer = false;

      DATA.$win.on('resize', function() {

        if (timer !== false) {

          clearTimeout(timer);

        }

        timer = setTimeout(() => {

          func();

        }, 300);

      });

    }


  }

  return Util;

})();

export default Util;
