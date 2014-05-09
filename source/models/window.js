var _ = require('lodash');

var Window = function (props) {
  _.extend(this, _.defaults(props || {}, this.defaults));
};

_.extend(Window.prototype, {

  onChange: _.noop,


  /**
   * defaults
   */

  defaults: {
    id: undefined,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    maxWidth: Infinity,
    minWidth: 0,
    maxHeight: Infinity,
    minHeight: 0,
    title: '',
    open: true
  },


  /**
   * move the window to a point
   * - x (int)
   * - y (int)
   */

  move: function (x, y) {
    this.x = x;
    this.y = y;
    this.onChange();
  },


  /**
   * resize the window by an amount
   * - deltaX (int) : negative=left, positive=right
   * - detlaY (int) : negative=up, positive=down
   * - isLeft (bool) : true=left, false=right
   * - isTop (bool) : true=top, false=bottom
   */

  resize: function (deltaX, deltaY, isLeft, isTop) {

    console.log(this.width, deltaX, this.width + deltaX);

    var finalWidth = this.width + (isLeft ? deltaX * -1 : deltaX); 
    var finalHeight = this.height + (isTop ? deltaY * -1 : deltaY);

    if (finalWidth > this.maxWidth || finalWidth < this.minWidth) {
      deltaX = 0;
    }

    if (finalHeight > this.maxHeight || finalHeight < this.minHeight) {
      deltaY = 0;
    }

    if (isLeft) {
      this.x += deltaX;
      this.width -= deltaX;
    } else {
      this.width += deltaX;
    }

    if (isTop) {
      this.y += deltaY;
      this.height -= deltaY;
    } else {
      this.height += deltaY;
    }

    this.onChange();
  },


  /**
   * find which quadrant of the window the mouse is
   * - x (int)
   * - y (int)
   */

  quadrant: function (x, y) {
    return {
      top: y < this.y + (this.height / 2),
      left: x < this.x + (this.width / 2)
    };
  },


  /**
   * close the window
   */

  close: function () {
    this.open = false;
    if (this.manager) this.manager.remove(this);
    this.onChange();
  },


  /**
   * focus the window
   */

  requestFocus: function () {
    if (this.manager) this.manager.bringToFront(this);
  },


  /*
   * rename the window
   * - title (string)
   */

  rename: function (title) {
    this.title = title;
    this.onChange();
  },


  /**
   * export model as json
   */

  toJSON: function () {
    return {
      id:      this.id,
      x:       this.x,
      y:       this.y,
      width:   this.width,
      height:  this.height,
      title:   this.title,
      open:    this.open
    };
  }

});

module.exports = Window;
