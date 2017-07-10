/**
 *
 *  delete item
 *
 *  削除のためのトリガーとアイテムを指定する .trigger
 *  クリックした要素そのものを削除する .delete
 *
 */
const ClickDelete = (($) => {

  class ClickDelete {

    /**
     * Constructor
     *
     * @param element DOM
     * @param element DOM
     */
    constructor(target, trigger) {

      this._target = $(target);
      this._trigger = $(trigger);

    }

    _delete($target) {

      $target.slideUp(450);

    }

    /*
    * public
    *
    */
    trigger() {

      let self = this;
      this._trigger.on('click', function(e) {

        e.preventDefault();
        let $target = $(this).closest(self._target);
        self._delete($target);

      });

    }

    delete() {

      let self = this;
      this._target.on('click', function(e) {

        e.preventDefault();
        self._delete($(this));

      });

    }

  }

  return ClickDelete;

})(jQuery);

export default ClickDelete;
