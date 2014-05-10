var _ = require('lodash');

var NULL = 0;
var MOVE = 1;
var RESIZE = 2;

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
    this._realX = x - this._offsetX;
    this._realY = y - this._offsetY;
    this.snap();
  },

  startMove: function (x, y) {
    this._mode = MOVE;
    this._offsetX = x - this.x;
    this._offsetY = y - this.y;
    this._realX = this.x;
    this._realY = this.y;
  },

  endMove: function () {
    delete this._realX;
    delete this._realY;
    this._mode = NULL;
    this.onChange();
  },


  /**
   * resize the window by an amount
   * - deltaX (int) : negative=left, positive=right
   * - detlaY (int) : negative=up, positive=down
   * - isLeft (bool) : true=left, false=right
   * - isTop (bool) : true=top, false=bottom
   */

  resize: function (x, y) {
    var deltaX = x - this._originX;
    var deltaY = y - this._originY;

    console.log(deltaX, deltaY);

    var finalWidth = this.width + (this._quad.left ? deltaX * -1 : deltaX); 
    var finalHeight = this.height + (this._quad.top ? deltaY * -1 : deltaY);

    if (finalWidth > this.maxWidth || finalWidth < this.minWidth) {
      deltaX = 0;
    }

    if (finalHeight > this.maxHeight || finalHeight < this.minHeight) {
      deltaY = 0;
    }

    if (this._quad.left) {
      this.x += deltaX;
      this.width -= deltaX;
    } else {
      this.width += deltaX;
    }

    if (this._quad.top) {
      this.y += deltaY;
      this.height -= deltaY;
    } else {
      this.height += deltaY;
    }
  },

  startResize: function (x, y) {
    console.log('starting resize');
    this._mode = RESIZE;
    this._quad = this.quadrant(x, y);
    this._originX = x;
    this._originY = y;
    this._realX = this.x;
    this._realY = this.y;
  },

  endResize: function () {
    console.log('ending resize');
    delete this._quad;
    delete this._realX;
    delete this._realY;
    delete this._originX;
    delete this._originY;
    this._mode = NULL;
    this.onChange();
  },


  /**
   * snap the window to some guidelines
   */

  snap: function () {
    this.x = this._realX;
    this.y = this._realY;
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
