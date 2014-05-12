var _ = require('lodash');
var signals = require('signals');

var INACTIVE = 0;
var MOVE = 1;
var RESIZE = 2;

var Window = function (props) {
  signals.convert(this);

  _.extend(this, _.defaults(props || {}, this.defaults));
  this.mode = INACTIVE;

  // JSON converts Infinity to null
  if (this.maxWidth === null) this.maxWidth = Infinity;
  if (this.maxHeight === null) this.maxHeight = Infinity;

  if (this.id === undefined) {
    throw new Error('All windows must have an id');
  }
};

_.extend(Window.prototype, {


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
    isOpen: true
  },


  /**
   * set position of the window
   * - x (number)
   * - y (number)
   */

  setPosition: function (x, y) {
    this.x = x;
    this.y = y;
    this.emit('change:position');
    this.emit('change');
  },


  /**
   * resize the window
   * - width (number)
   * - height (number)
   */

  setSize: function (width, height) {
    this.width = width;
    this.height = height;
    this.emit('change:size');
    this.emit('change');
  },


  /**
   * start moving the window
   * - x (number) : horizontal position of the mouse
   * - y (number) : vertical position of the mouse
   */

  startMove: function (x, y) {
    this.mode = MOVE;
    this._offsetX = x - this.x;
    this._offsetY = y - this.y;
  },


  /**
   * start resizing the window
   * - x (number) : horizontal position of the mouse
   * - y (number) : vertical position of the mouse
   */

  startResize: function (x, y) {
    this.mode = RESIZE;
    this._quad = this._quadrant(x, y);
    this._startX = this.x;
    this._startY = this.y;
    this._startWidth = this.width;
    this._startHeight = this.height;
    this._originX = x;
    this._originY = y;
  },


  /**
   * update a move/resize action
   * - x (number) : horizontal position of the mouse
   * - y (number) : vertical position of the mouse
   */

  update: function (x, y) {
    if (this.mode === MOVE) return this._move(x, y);
    if (this.mode === RESIZE) return this._resize(x, y);
  },


  /**
   * finish moving/resizing the window
   */

  endChange: function () {
    if (this.mode === INACTIVE) return;
    this.mode = INACTIVE;

    if (this.mode === MOVE) {
      delete this._offsetX;
      delete this._offsetY;
    }

    else if (this.mode === RESIZE) {
      delete this._quad;
      delete this._startX;
      delete this._startY;
      delete this._startWidth;
      delete this._startHeight;
      delete this._originX;
      delete this._originY;
      this.emit('change:position');
    }

    this.emit('change:position');
    this.emit('change');
  },


  /**
   * open the window
   */

  open: function () {
    if (this.isOpen) return;
    this.isOpen = true;
    this.emit('change:open');
    this.emit('change');
  },


  /**
   * close the window
   */

  close: function () {
    if (! this.isOpen) return;
    this.isOpen = false;
    this.emit('change:open');
    this.emit('change');
  },


  /**
   * focus the window
   */

  requestFocus: function () {
    if (! this.manager) {
      throw new Error('Cannot focus a window that is not being managed');
    }
    this.manager.focus(this);
  },


  /**
   * check if the window is focused
   */

  isFocused: function () {
    if (! this.manager) return false;
    return this.manager.active() === this;
  },


  /*
   * rename the window
   * - title (string)
   */

  rename: function (title) {
    this.title = title;
    this.emit('change:title');
    this.emit('change');
  },


  /**
   * export model as json
   */

  toJSON: function () {
    return {
      id:         this.id,
      x:          this.x,
      y:          this.y,
      width:      this.width,
      height:     this.height,
      maxWidth:   this.maxWidth,
      minWidth:   this.minWidth,
      maxHeight:  this.maxHeight,
      minHeight:  this.minHeight,
      title:      this.title,
      isOpen:     this.isOpen
    };
  },



  /**
   * private
   * move the window to a point
   * - x (number) : horizontal position of the mouse
   * - y (number) : vertical position of the mouse
   */

  _move: function (x, y) {
    this.x = x - this._offsetX;
    this.y = y - this._offsetY;
  },


  /**
   * private
   * resize the window by an amount
   * - x (number) : horizontal position of the mouse
   * - y (number) : vertical position of the mouse
   */

  _resize: function (x, y) {
    var deltaX = x - this._originX;
    var deltaY = y - this._originY;

    var finalWidth = this._startWidth + (this._quad.left ? deltaX * -1 : deltaX);
    var finalHeight = this._startHeight + (this._quad.top ? deltaY * -1 : deltaY);

    if (finalWidth > this.maxWidth ) {
      deltaX = this.maxWidth - this._startWidth;
      if (this._quad.left) deltaX *= -1;
    } else if (finalWidth < this.minWidth) {
      deltaX = this.minWidth - this._startWidth;
      if (this._quad.left) deltaX *= -1;
    }

    if (finalHeight > this.maxHeight) {
      deltaY = this.maxHeight - this._startHeight;
      if (this._quad.top) deltaY *= -1;
    } else if (finalHeight < this.minHeight) {
      deltaY = this.minHeight - this._startHeight;
      if (this._quad.top) deltaY *= -1;
    }

    if (this._quad.left) {
      this.x = this._startX + deltaX;
      this.width = this._startWidth - deltaX;
    } else {
      this.width = this._startWidth + deltaX;
    }

    if (this._quad.top) {
      this.y = this._startY + deltaY;
      this.height = this._startHeight - deltaY;
    } else {
      this.height = this._startHeight + deltaY;
    }
  },


  /**
   * private
   * find which quadrant of the window the mouse is
   * - x (number) : horizontal position of the mouse
   * - y (number) : vertical position of the mouse
   */

  _quadrant: function (x, y) {
    return {
      top: y < this.y + (this.height / 2),
      left: x < this.x + (this.width / 2)
    };
  }

});

module.exports = Window;
