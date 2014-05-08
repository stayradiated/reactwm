var _ = require('underscore');

var Window = function (props) {
  props = _.defaults(props || {}, this.defaults);
  this.id     = props.id;
  this.x      = props.x;
  this.y      = props.y;
  this.width  = props.width;
  this.height = props.height;
  this.title  = props.title;
};

_.extend(Window.prototype, {

  defaults: {
    id: undefined,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    title: ''
  },

  move: function (x, y) {
    this.x = x;
    this.y = y;
  },

  resize: function (deltaX, deltaY, isLeft, isTop) {
    if (isLeft) {
      this.x -= deltaX;
      this.width += deltaX;
    } else {
      this.width -= deltaX;
    }

    if (isTop) {
      this.y -= deltaY;
      this.height += deltaY;
    } else {
      this.height -= deltaY;
    }
  },

  quadrant: function (x, y) {
    return {
      top: y < this.y + (this.height / 2),
      left: x < this.x + (this.width / 2)
    };
  },

  rename: function (title) {
    this.title = title;
  },

  toJSON: function () {
    return {
      id:      this.id,
      x:       this.x,
      y:       this.y,
      width:   this.width,
      height:  this.height,
      title:   this.title
    };
  }

});

module.exports = Window;
