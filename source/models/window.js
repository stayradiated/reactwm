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

  resize: function (originX, originY, deltaX, deltaY) {
    var halfWidth = this.x + (this.width / 2);
    var halfHeight = this.y + (this.height / 2);

    if (originX < halfWidth) {
      // move left side
      this.x += deltaX;
      this.width -= deltaX;
    } else {
      // move right side
      this.width -= deltaX;
    }

    if (originY < halfHeight) {
      // move top side
      this.y += deltaY;
      this.height -= deltaY;
    } else {
      // move bottom side
      this.height -= deltaY;
    }
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
